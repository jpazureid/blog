const gulp = require("gulp");
const replace = require("gulp-string-replace");
const del = require('del');
const path = require('path');
const blogRoot = "/blog"

const sourceFolders = ["active-directory-federation-service/", "azure-active-directory/", "azure-active-directory-connect/"];
const markdownFiles = sourceFolders.map(dir => path.join(dir, "**/*.md"));
const imageFiles = sourceFolders.map(dir => path.join(dir, "**/*.+(jpg|jpeg|png|gif|svg)"));
imageFiles.push('favicon/*.+(png|ico|svg|webmanifest|xml)')
const sourceFiles = sourceFolders.map(dir => path.join(dir, "**/*"));

const outputPath = "source/_posts/";
const Hexo = require("hexo");
const hexo = new Hexo(process.cwd(), {});

gulp.task("server", function (cb) {
  hexo
    .init()
    .then(function () {
      return hexo.call("server", {});
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
});

gulp.task("deploy", function (cb) {
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
      return cb();
    })
    .catch(function (err) {
      console.log(err);
      hexo.exit(err);
      return cb(err);
    });
});

gulp.task("generate", function (cb) {
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
});

gulp.task('cleanOutputPath', function () {
  return del([
    path.join(outputPath, "/**/*")
  ]);
});

gulp.task("open", () => {
  return gulp.src("./").pipe(exec("open http://localhost:4000"));
});

gulp.task("copyMarkdown", () => {
  return (
    gulp
    .src(markdownFiles)
    //fix absolute path image
    .pipe(
      replace(/!\[.*\]\(.*\/(.*)\)/g, (match, p1, offset, string) => {
        return `{% asset_img ${p1} %}`;
      })
    ).pipe(
      // delete first h1 header
      replace(/^# .*/m, "")
    ).pipe(
      replace(/\]\((.+?).md\)/g, (match, p1, offset, string) => {
        const pathes = p1.split('/')
        const area = pathes[pathes.length - 2]
        const title = pathes[pathes.length - 1].replace(".md", "")
        return `](${blogRoot}/${area}/${title}/)`;
      })
    )
    .pipe(gulp.dest(outputPath))
  );
});

gulp.task("copyImage", () => {
  return gulp.src(imageFiles).pipe(gulp.dest(outputPath));
});

gulp.task(
  "default",
  gulp.series("cleanOutputPath", gulp.parallel("copyMarkdown", "copyImage"), "server")
);

gulp.task(
  "publish",
  gulp.series("cleanOutputPath", gulp.parallel("copyMarkdown", "copyImage"), "deploy")
);

gulp.task(
  "build",
  gulp.series("cleanOutputPath", gulp.parallel("copyMarkdown", "copyImage"), "generate")
);
