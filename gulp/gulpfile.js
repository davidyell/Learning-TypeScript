var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var paths = {
  pages: ['src/*.html']
};

gulp.task('copyHtml', function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('dist'));
});

function bundle () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['env'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
}

gulp.task('default', ['copyHtml'], bundle);
