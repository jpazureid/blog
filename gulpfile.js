const fs = require("fs");
const del = require("del");
const path = require("path");
const glob = require("glob")
const mime = require('mime');
const replace = require("gulp-string-replace");
const { src, dest, watch, parallel, series } = require("gulp");
const { BlobServiceClient } = require("@azure/storage-blob");

const blogRoot = "/blog";
const sourceFolder = "articles";
let markdownFiles = path.join(sourceFolder, "**/*.md");
let imageFiles = path.join(sourceFolder, "**/*.+(jpg|jpeg|png|gif|svg|bmp)");
const outputPath = "source/_posts/";
const Hexo = require("hexo");
const hexo = new Hexo(process.cwd(), {});

const previewBaseUrl = process.env.PREVIEW_BASE_URL;
const branchName = process.env.CIRCLE_BRANCH;

var replaceOptions = {
  logs: {
    enabled: false
  }
};

const server = (done) => {
  hexo
    .init()
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
      console.log(err);
      hexo.exit(err);
      done(err);
    });
  done();
};

const deploy = (done) => {
  hexo
    .init()
    .then(function () {
      return hexo.call("clean", {});
    })
    .then(function () {
      return hexo.call("deploy", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      console.log(err);
      hexo.exit(err);
      done(err);
    });
};

const generate = (cb) => {
  hexo
    .init()
    .then(function () {
      return hexo.call("clean", {});
    })
    .then(function () {
      return hexo.call("generate", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      return cb();
    })
    .catch(function (err) {
      console.log(err);
      hexo.exit(err);
      return cb(err);
    });
};

const generateForPreview = (cb) => {
  if (!(branchName && previewBaseUrl)){
    cb(new Error("environment variables are not defined. Please set CIRCLE_BRANCH and PREVIEW_BASE_URL."))
  }
  hexo
    .init()
    .then(function () {
      return hexo.call("clean", {});
    })
    .then(function () {
      hexo.config.root = branchName;
      hexo.config.url =  new URL(branchName, previewBaseUrl).toString();
      return hexo.call("generate", {});
    })
    .then(function () {
      return hexo.exit();
    })
    .then(function () {
      return cb();
    })
    .catch(function (err) {
      console.log(err);
      hexo.exit(err);
      return cb(err);
    });
};

const cleanOutputPath = () => {
  return del([
    path.join(outputPath, "/**/*")
  ]);
  
};

const copyMarkdown = () => {
  return src(markdownFiles, { base: sourceFolder })
    //fix absolute path image
    .pipe(
      // delete first h1 header
      replace(/^# .*/m, "", replaceOptions)
    ).pipe(
      replace(/\]\((.+?).md\)/g, (match, p1, offset, string) => {
        const pathes = p1.split("/")
        const area = pathes[pathes.length - 2]
        const title = pathes[pathes.length - 1].replace(".md", "")
        return `](${blogRoot}/${area}/${title}/)`;
      },replaceOptions)
    )
    .pipe(dest(outputPath));
};

const copyImage = () => {
  return src(imageFiles, { base: sourceFolder })
    .pipe(dest(outputPath));
}

// TODO copy only changed files
const watchFiles = () => {
  watch("articles/**/*.*", parallel(copyMarkdown, copyImage));
};

// global container client
let containerClient = null;

// load container client if not exists
const getContainerClient = async () => {
  if(containerClient && containerClient.exists()){
    return containerClient;
  } 
  const containerName = "$web";
  const blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  containerClient = await blobServiceClient.getContainerClient(containerName); 
  return containerClient;
}

//it may be better to use gulp src instead of glob...
async function uploadToBlob(done){
  const containerClient = await getContainerClient();
  glob("./public/**/*",{nodir: true}, async (err, files) => {
    if (err) done(err);
    await uploadFilesToBlobFolder(containerClient,files, branchName);
    done();
  });
}

async function deleteBlobFolderIfExist(done){
  const containerClient = await getContainerClient();
  console.log(`delete ${branchName}`);
  for await (const item of containerClient.listBlobsFlat({prefix: branchName})) {
    if (item.kind === "prefix") {
      continue;
    }
    console.log(`delete ${item.name}`);
    containerClient.deleteBlob(item.name);
  }
}

async function uploadFilesToBlobFolder(containerClient,files, folderName){
    // List the blob(s) in the container.
    return Promise.all(files.map(async file => {
    //remove public
    fileName = file.replace("public/","");
    const blobName = path.join(folderName, fileName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const data = fs.readFileSync(file);
    const contentType = mime.getType(fileName);
    const options = {
      blobHTTPHeaders: {
        blobContentType: contentType
      }
    }
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length, options); 
    console.log(`upload ${blobName} with requestId: ${uploadBlobResponse.requestId} ${options.blobHTTPHeaders.blobContentType}`);
  })) 
}

exports.default = series(cleanOutputPath, parallel(copyMarkdown, copyImage), server, watchFiles);
exports.publish = series(cleanOutputPath, parallel(copyMarkdown, copyImage), deploy);
exports.build = series(cleanOutputPath, parallel(copyMarkdown, copyImage), generate);
exports.uploadPreview = series(
  parallel(
    deleteBlobFolderIfExist,
    series(cleanOutputPath,parallel(copyMarkdown, copyImage), generateForPreview)
  ),
  uploadToBlob
  );
exports.deletePreview = series(deleteBlobFolderIfExist);