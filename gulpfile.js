// grab our gulp packages
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('source/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
    return gulp.src('source/scss/**/*.scss')
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('build-js', function() {
    return gulp.src('source/javascript/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        // only uglify is gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/javascript'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('source/javascript/**/*.js', ['jshint']);
    gulp.watch('source/scss/**/*.scss', ['build-css']);
});