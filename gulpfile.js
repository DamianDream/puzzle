const gulp = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpUglify = require('gulp-uglify');
const gulpPug = require('gulp-pug');
const gulpData = require('gulp-data');
const gulpStylus = require('gulp-stylus');
const gulpif = require('gulp-if');
const gulpCleanCSS = require('gulp-clean-css');
const del = require('delete');

const outputDir = 'docs';

const isProduction = process.env.NODE_ENV === 'production';

const srcStylus = ['src/**/*.css', 'src/**/*.styl'];
const srcPug = 'src/**/*.pug';
const srcJS = 'src/**/*.js';

function server() {
    return gulpConnect.server({
        host: '0.0.0.0',
        port: 8080,
        root: 'docs/',
        livereload: true
    });
}

function clean(cb) {
    del([outputDir], cb);
}

function stylus() {
    return gulp.src(srcStylus)
        .pipe(gulpStylus({
            'include css': true
        }))
        .pipe(gulpCleanCSS())
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function pug() {
    return gulp.src(srcPug)
        .pipe(gulpData(() => {
            return {
                __dirname: __dirname,
                require: require
            };
        }))
        .pipe(gulpPug())
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function js() {
    return gulp.src(srcJS)
        .pipe(gulpif(isProduction, gulpUglify()))
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function watch() {
    gulp.watch(srcJS, gulp.series(js));
    gulp.watch(srcStylus, gulp.series(stylus));
    gulp.watch(srcPug, gulp.series(pug));
}

exports.default = gulp.parallel(
    watch,
    gulp.series(clean, js, pug, stylus, server)
);
exports.server = server;
exports.clean = clean;
exports.build = gulp.series(clean, js, pug, stylus);

exports.dev = gulp.parallel(
    watch,
    gulp.series(clean, js, pug, stylus, server)
);
