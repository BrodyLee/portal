'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    debug = require('gulp-debug'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var path = {
  build: {
    css: 'dist/css',
    js: 'dist/js'
  },
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    css: 'dist/css/app.css'
  },
  watch: {
    style: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
  }
};

gulp.task('styles', function() {
  gulp.src(path.src.scss)
    .pipe(debug({title: 'src'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'compile'}))
    .pipe(gulp.dest(path.build.css))
});

gulp.task('autoprefix', function () {
  gulp.src(path.src.css)
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(path.build.css))
});

gulp.task('minify', function () {
  gulp.src(path.src.css)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('jsbuild', function () {
  gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
});

gulp.task('watch', function () {
  watch(path.watch.style, function(event, cb) {
    gulp.start('styles');
  });
  watch(path.watch.js, function(event, cb) {
    gulp.start('jsbuild');
  });
});

//Watch task
gulp.task('default', ['watch']);




