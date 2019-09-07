const { src, dest, watch, parallel, series } = require('gulp');
const replace = require("gulp-string-replace");
const del = require("del");
const path = require("path");
const blogRoot = "/blog";

const sourceFolder = "articles";
let markdownFiles = path.join(sourceFolder, "**/*.md");
let imageFiles = path.join(sourceFolder, "**/*.+(jpg|jpeg|png|gif|svg|bmp)");
const outputPath = "source/_posts/";
const Hexo = require("hexo");
const hexo = new Hexo(process.cwd(), {});

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

const cleanOutputPath = () => {
  return del([
    path.join(outputPath, "/**/*")
  ]);
  
};

const copyMarkdown = () => {
  return src(markdownFiles, { base: sourceFolder })
    //fix absolute path image
    .pipe(
      replace(/!\[.*\]\(.*\/(.*)\)/g, (match, p1, offset, string) => {
        return `{% asset_img ${p1} %}`;
      },replaceOptions)
    ).pipe(
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

exports.default = series(cleanOutputPath, parallel(copyMarkdown, copyImage), server, watchFiles);
exports.publish = series(cleanOutputPath, parallel(copyMarkdown, copyImage), deploy);
exports.build = series(cleanOutputPath, parallel(copyMarkdown, copyImage), generate);