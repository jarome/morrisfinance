var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var image = require('gulp-image');
var autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['app/src/scss/style.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/owl.carousel/dist/owl.carousel.js', 'node_modules/bootstrap/dist/js/bootstrap.js', 'app/src/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('assets', function () {
  gulp.src('app/src/assets/*')
    .pipe(image())
    .pipe(gulp.dest('app/assets'));
});


gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['app/partials']
    }))
    // output files in app folder
    .pipe(gulp.dest('app'))
});

gulp.task('html-watch', ['nunjucks'], function (done) {
  browserSync.reload();
  done();
});

// Static Server + watching scss/html files
gulp.task('run', ['sass', 'js', 'assets', 'nunjucks'], function() {

  browserSync.init({
    server: "app"
  });

  gulp.watch(['app/src/scss/*.scss'], ['sass']);
  gulp.watch(['app/src/js/*.js'], ['js']);
  gulp.watch("app/partials/*/**.html", ['html-watch']);
});