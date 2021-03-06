import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import gulpLoadPlugins from 'gulp-load-plugins'
import tildeImporter from 'node-sass-tilde-importer'
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import cssImport from "postcss-import";
import cssnano from "cssnano";

const $ = gulpLoadPlugins()
const isProduction = process.env.NODE_ENV === 'production'
const browserSync = BrowserSync.create();
const hugoBin = `hugo`;
const defaultArgs = ["-d", "../dist", "-s", "site"];

const onError = (err) => {
  console.log(err)
}

if (process.env.DEBUG) {
  defaultArgs.unshift("--debug")
}

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));
gulp.task("build", ["scss", "css", "js", "cms-assets", "hugo"]);
gulp.task("build-preview", ["scss", "css", "js", "cms-assets", "hugo-preview"]);

gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe($.postcss([
      cssImport({from: "./src/css/main.css"}),
      cssnext(),
      cssnano(),
    ]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

gulp.task("scss", () => (
  gulp.src("./src/scss/app.scss")
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.print())
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sass({ precision: 5, importer: tildeImporter }))
    .pipe($.autoprefixer(['ie >= 10', 'last 2 versions']))
    .pipe($.if(isProduction, $.cssnano({ discardUnused: false, minifyFontValues: false })))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
));

gulp.task("cms-assets", () => (
  gulp.src("./node_modules/netlify-cms/dist/*.{woff,eot,woff2,ttf,svg,png}")
    .pipe(gulp.dest("./dist/css"))
))

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("svg", () => {
  const svgs = gulp
    .src("site/static/images/icons-*.svg")
    .pipe($.svgmin())
    .pipe($.svgstore({inlineSvg: true}));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("site/layouts/partials/svg.html")
    .pipe($.inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("site/layouts/partials/"));
});

gulp.task("server", ["hugo", "scss", "css", "cms-assets", "js", "svg"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/scss/**/*.scss", ["scss"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./site/static/images/icons-*.svg", ["svg"]);
  gulp.watch("./site/**/*", ["hugo"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload("notify:false");
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
