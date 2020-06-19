const fs = require("fs");
const del = require("del");
const path = require("path");
const glob = require("glob");
const mime = require("mime");
const logger = require("gulplog");
const replace = require("gulp-string-replace");
const { src, dest, watch, parallel, series, lastRun } = require("gulp");
const { BlobServiceClient } = require("@azure/storage-blob");
const { Octokit } = require("@octokit/rest");

const previewBaseUrl = process.env.PREVIEW_BASE_URL;
const branchName = process.env.CIRCLE_BRANCH;

let blogRoot = "/blog";
if(branchName !== "master") {
  blogRoot = "/" + branchName;
}
const sourceFolder = "articles";
let markdownFiles = path.join(sourceFolder, "**/*.md");
let imageFiles = path.join(sourceFolder, "**/*.+(jpg|jpeg|png|gif|svg|bmp|JPG|JPEG|PNG|GIF|SVG|BMP)");
const outputPath = "source/_posts/";
const Hexo = require("hexo");
const hexo = new Hexo(process.cwd(), {});

let previewUrl = "";
if (branchName && previewBaseUrl) {
  previewUrl = new URL(
    branchName.replace("/", ""),
    previewBaseUrl
  ).toString();
}

var replaceOptions = {
  logs: {
    enabled: false,
  },
};

const server = (done) => {
  hexo
    .init()
    .then(function(){
      logger.info("run: hexo clean");
      return hexo.call("clean", {});
    })
    .then(function () {
      return hexo.call("server", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      logger.error(err);
      hexo.exit(err);
      done(err);
    });
  done();
};

const deploy = (done) => {
  hexo
    .init()
    .then(function () {
      logger.info("run: hexo clean");
      return hexo.call("clean", {});
    })
    .then(function () {
      logger.info("run: hexo deploy");
      return hexo.call("deploy", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      logger.error(err);
      hexo.exit(err);
      done(err);
    });
};

const generate = (cb) => {
  hexo
    .init()
    .then(function () {
      logger.info("run: hexo clean");
      return hexo.call("clean", {});
    })
    .then(function () {
      logger.info("run: hexo generate");
      return hexo.call("generate", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      return cb();
    })
    .catch(function (err) {
      logger.error(err);
      hexo.exit(err);
      return cb(err);
    });
};

const generateForPreview = (cb) => {
  if (!previewUrl) {
    cb(
      new Error(
        "environment variables are not defined. Please set CIRCLE_BRANCH and PREVIEW_BASE_URL."
      )
    );
  }
  hexo
    .init()
    .then(function () {
      logger.info("run: hexo clean");
      return hexo.call("clean", {});
    })
    .then(function () {
      hexo.config.root = `/${branchName}/`;
      hexo.config.url = previewUrl;
      logger.info(`run: hexo generate with { root: "${hexo.config.root}", url: "${hexo.config.url}" }`);
      return hexo.call("generate", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      return cb();
    })
    .catch(function (err) {
      logger.error(err);
      hexo.exit(err);
      return cb(err);
    });
};

const cleanOutputPath = () => {
  return del([path.join(outputPath, "/**/*")]);
};

const copyMarkdown = () => {
  return (
    src(markdownFiles, { base: sourceFolder, since: lastRun(copyMarkdown) })
      //fix absolute path image
      .pipe(
        // delete first h1 header
        replace(/^# .*/m, "", replaceOptions)
      )
      .pipe(
        replace(
          /\]\((.+?).md\)/g,
          (match, p1, offset, string) => {
            const pathes = p1.split("/");
            const area = pathes[pathes.length - 2];
            const title = pathes[pathes.length - 1].replace(".md", "");
            return `](${blogRoot}/${area}/${title}/)`;
          },
          replaceOptions
        )
      )
      .pipe(dest(outputPath))
  );
};

const copyImage = () => {
  return src(imageFiles, { base: sourceFolder, since: lastRun(copyImage) }).pipe(dest(outputPath));
};

// TODO copy only changed files
const watchFiles = () => {
  watch("articles/**/*.*", parallel(copyMarkdown, copyImage));
};

// global container client
let containerClient = null;

// load container client if not exists
const getContainerClient = async () => {
  if (containerClient && containerClient.exists()) {
    return containerClient;
  }
  const containerName = "$web";
  const blobServiceClient = await BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  containerClient = await blobServiceClient.getContainerClient(containerName);
  return containerClient;
};

//it may be better to use gulp src instead of glob...
async function uploadToBlob(done) {
  const containerClient = await getContainerClient();
  const files = glob("./public/**/*", { nodir: true, sync: true });
  await uploadFilesToBlobFolder(containerClient, files, branchName);
  done();
}

async function deleteBlobFolderIfExist(done) {
  const containerClient = await getContainerClient();
  logger.info(`delete ${branchName}`);
  for await (const item of containerClient.listBlobsFlat({
    prefix: branchName,
  })) {
    if (item.kind === "prefix") {
      continue;
    }
    logger.info(`delete ${item.name}`);
    containerClient.deleteBlob(item.name);
  }
}

async function uploadFilesToBlobFolder(containerClient, files, folderName) {
  const uploadPublicFolderTasks = files.map(async (file) => {
    //remove public
    fileName = file.replace("public/", "");
    const blobName = path.join(folderName, fileName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const data = fs.readFileSync(file);
    const contentType = mime.getType(fileName);
    const options = {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    };
    const uploadBlobResponse = await blockBlobClient.upload(
      data,
      data.length,
      options
    );
    logger.info(
      `upload ${blobName} with requestId: ${uploadBlobResponse.requestId} ${options.blobHTTPHeaders.blobContentType}`
    );
  });

  const uploadRobotsTask = async () => {
    const blobName = "robots.txt";
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const contentType = mime.getType(fileName);
    const options = {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    };
    const data = "User-agent: *\nDisallow: /"
    const uploadBlobResponse = await blockBlobClient.upload(
      data,
      data.length,
      options
    );
    logger.info(
      `upload ${blobName} with requestId: ${uploadBlobResponse.requestId} ${options.blobHTTPHeaders.blobContentType}`
    );
  }

  return Promise.all(
    [...uploadPublicFolderTasks, uploadRobotsTask()]);
}

const commentToGithub = async (done) => {
  const secret = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!secret) {
    logger.warn("GitHub Access Token is not defined. skipped comment task.");
    return done();
  }

  const octokit = new Octokit({
    auth: secret,
  });
  //CIRCLE_PR_NUMBER, CIRCLE_PR_REPONAME can be only used for forked PR.
  //'https://github.com/jpazureid/blog/pull/112'
  const prUrl = process.env.CIRCLE_PULL_REQUEST;
  const repoOwner = prUrl.split("/")[3];
  const repoName = prUrl.split("/")[4];
  const issueNumber = prUrl.split("/")[6];

  logger.info(`fetch PR comments: ${prUrl}`);
  const { data: prComments } = await octokit.issues.listComments({
    owner: repoOwner,
    repo: repoName,
    issue_number: issueNumber,
  });

  const regex = /🎉🐧/;
  if (prComments.find((comment) => regex.test(comment.body))) {
    logger.info("There is already bot comment");
    return done();
  }

  logger.info("add comment to PR");
  const result = await octokit.issues.createComment({
    owner: repoOwner,
    repo: repoName,
    issue_number: issueNumber,
    // add slash to end of url.
    body: `🎉🐧Thank you for your contribute!\n We have launched [preview environment!](${previewUrl}/)`,
  });
  if (result.status != 201) {
    logger.error("failed creating comment");
    return done(new Error(result));
  }
  logger.info("succeeded comment to PR");
  return done();
};

const deleteMergedPreview = async () => {
  const secret = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!secret) {
    logger.warn("GitHub Access Token is not defined. skipped delete task.");
    return done();
  }

  const octokit = new Octokit({
    auth: secret,
  });

  //list pull requests
  const result = await octokit.paginate("GET /repos/:owner/:repo/pulls", {
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME,
  });

  const openedPRs = result.map((pr) => pr.head.ref);
  const containerClient = await getContainerClient();
  for await (const item of containerClient.listBlobsFlat()) {
    if (item.kind === "prefix") {
      continue;
    }
    if(item.name === "robots.txt"){
      continue;
    }
    if (openedPRs.includes(item.name.split("/")[0])) {
      continue;
    }
    logger.info(`delete ${item.name}`);
    containerClient.deleteBlob(item.name);
  }
};

exports.default = series(
  cleanOutputPath,
  parallel(copyMarkdown, copyImage),
  server,
  watchFiles
);
exports.publish = series(
  cleanOutputPath,
  parallel(copyMarkdown, copyImage),
  deploy
);
exports.build = series(
  cleanOutputPath,
  parallel(copyMarkdown, copyImage),
  generate
);
exports.uploadPreview = series(
  parallel(
    deleteBlobFolderIfExist,
    series(
      cleanOutputPath,
      parallel(copyMarkdown, copyImage),
      generateForPreview
    )
  ),
  uploadToBlob,
  commentToGithub
);
exports.deleteMergedPreview = series(deleteMergedPreview);