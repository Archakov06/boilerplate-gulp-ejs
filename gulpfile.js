var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var ejs = require('gulp-ejs');
var plumber = require('gulp-plumber');
var fs = require('fs');
var svgSprite = require('gulp-svg-sprites');

// SVG Sprites
gulp.task('svg', function() {
  gulp
    .src('public/assets/*.svg')
    .pipe(
      svgSprite({
        mode: 'defs',
        preview: false,
        cssFile: '',
        svg: {
          sprite: 'sprite.svg',
        },
      }),
    )
    .pipe(gulp.dest('public/assets'));
});

// SCSS

gulp.task('scss', function() {
  gulp
    .src('src/scss/app.scss')
    .pipe(plumber())
    .pipe(
      sass({ includePaths: ['node_modules'], errLogToConsole: true }).on('error', sass.logError),
    ) // Keep running gulp even though occurred compile error
    .pipe(
      pleeease({
        autoprefixer: {
          browsers: ['last 2 versions'],
        },
      }),
    )
    .pipe(gulp.dest('public/css'))
    .pipe(reload({ stream: true }));
});

// Js-concat-uglify

gulp.task('js', function() {
  gulp
    .src('src/js/libs/*.js')
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('public/js'))
    .pipe(reload({ stream: true }));
  gulp
    .src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('public/js'))
    .pipe(reload({ stream: true }));
});

// EJS

var json = JSON.parse(fs.readFileSync('site.json')); // parse json
gulp.task('ejs', function() {
  gulp
    .src(['src/templates/*.ejs']) // Don't build html which starts from underline
    .pipe(plumber())
    .pipe(ejs({}, { ext: '.html' }))
    .pipe(gulp.dest('public'));
});

// Static server

gulp.task('browser-sync', function() {
  browserSync({
    port: 3333,
    server: {
      baseDir: './public', //　Target directory
      index: 'index.html', // index file
    },
  });
});

gulp.task('clear', function() {});

// Reload all browsers

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Task for `gulp` command

gulp.task('build', ['clear', 'scss', 'ejs', 'js']);

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/*.js', ['js']);
  // gulp.watch('public/assets/*.svg', ['svg']);
  gulp.watch('public/*.html', ['bs-reload']);
  gulp.watch(['src/templates/**/*.ejs'], ['ejs']);
});
