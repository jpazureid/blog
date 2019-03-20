var gulp = require("gulp");
var replace = require("gulp-string-replace");
var sourceFolders = ["../active-directory-federation-service/","../azure-active-directory/","../azure-active-directory-connect/"];
var markdownFiles = sourceFolders.map(dir => dir + "**/*.md");
var imageFiles = sourceFolders.map(dir => dir + "**/*.+(jpg|jpeg|png|gif)");
var sourceFiles = sourceFolders.map(dir => dir + "**/*");

var outputPath = "source/_posts/";
var Hexo = require("hexo");
var hexo = new Hexo(process.cwd(), {});

gulp.task("server", function(cb) {
  hexo
    .init()
    .then(function() {
      return hexo.call("server", {});
    })
    .then(function() {
      return hexo.exit();
    })
    .then(function() {
      return cb();
    })
    .catch(function(err) {
      console.log(err);
      hexo.exit(err);
      return cb(err);
    });
});

gulp.task("generate", function(cb) {
  hexo
    .init()
    .then(function() {
      return hexo.call("clean", {});
    })
    .then(function() {
      return hexo.call("generate", {});
    })
    .then(function() {
      return hexo.exit();
    })
    .then(function() {
      return cb();
    })
    .catch(function(err) {
      console.log(err);
      hexo.exit(err);
      return cb(err);
    });
});

gulp.task("deploy", function(cb) {
  hexo
    .init()
    .then(function() {
      return hexo.call("clean", {});
    })
    .then(function() {
      return hexo.call("deploy", {});
    })
    .then(function() {
      return hexo.exit();
    })
    .then(function() {
      return cb();
    })
    .catch(function(err) {
      console.log(err);
      hexo.exit(err);
      return cb(err);
    });
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
      )
      .pipe(gulp.dest(outputPath))
  );
});

gulp.task("copyImage", () => {
  return gulp.src(imageFiles).pipe(gulp.dest(outputPath));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("copyMarkdown", "copyImage"), "server")
);

gulp.task(
  "publish",
  gulp.series(gulp.parallel("copyMarkdown", "copyImage"), "deploy")
);
