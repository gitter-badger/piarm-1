/*
 |--------------------------------------------------------------------------
 | Gulp compile script
 |
 |  Commands:
 |
 | - gulp (Run the default build function)
 | - gulp watch (Watch files for changes and build on a change)
 |
 | Flags:
 |  --min (bundle the es5 build into a single, minified out file)
 |  --debug (Build and output pretty, source mapped errors to console)
 |--------------------------------------------------------------------------
 */

/*| ------------ INCLUDES ------------ |*/
var gulp = require("gulp");
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var transpile = require('gulp-babel');

/*| ------------ SOURCE INPUT AND OUTPUT ------------ |*/
var paths = {
    js: './src/piarm/**/*.js',
    out: './src/build'
};

/*| ------------ BUILDER ------------ |*/
gulp.task('build', function () {
    gulp.src(paths.js)
        .pipe(plumber())
        .pipe(transpile({stage: 0, optional: 'runtime'}))
        .pipe(gulp.dest(paths.out));
});

/*| ------------ WATCH ------------ |*/
gulp.task('watch', function () {
    gulp.start('build');
    watch(paths.js, function () {
        gulp.start('build')
    })
});