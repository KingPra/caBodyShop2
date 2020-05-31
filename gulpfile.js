//converting gulp 3 to gulp 4


const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const htmlMin = require('gulp-htmlmin');
const browsersync = require("browser-sync").create();
const {src, series, parallel, dest, watch} = require('gulp');

const htmlPath = './*.html'
const jsPath = './js/*'
const cssPath = './css/*'
const lessPath = './less/*';
const imgPath = './img/*';
const vendorPath = './vendor/**/*';
const dist = 'cabodyshopllc.com';


//set banner content
const banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

//Browersync
function browserSync(done) {
    browsersync.init({
        server: {
            basedir: "./"
        },
        port: 3000
    });
    done();
}

//Browsersync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// copy and minify html
function htmlTask() {
    return src(htmlPath)
    .pipe(htmlMin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(dest(dist))
    .pipe(browsersync.stream());
}

//copy and minfy css
function cssTask() {
    return src(cssPath)
    .pipe(cssnano())
    .pipe(dest(`${dist}/css`))
    .pipe(browsersync.stream());
}

//copy less
function lessTask() {
    return src(lessPath)
    .pipe(dest(`${dist}/less`))
}

//copy vendor files
function vendorTask() {
    return src(vendorPath)
    .pipe(dest(`${dist}/vendor`));
}

//copy and minify images
function imageTask() {
    return src(imgPath).pipe(imagemin()).pipe(gulp.dest(`${dist}/img`));
}

//copy and minify js (changed from uglify to terser)
function jsTask() {
    return src(jsPath)
    //.pipe(sourcemaps.init())
    //.pipe(concat('all.js'))
    .pipe(terser())
    //.pipe(sourcemaps.write('.'))
    .pipe(dest(`${dist}/js`))
    .pipe(browsersync.stream());
}

// watch tasks and auto update when changes are made
function watchTask() {
    watch(
        [cssPath, jsPath], {interval: 1000}, 
        series(parallel(htmlTask, cssTask, jsTask), browserSyncReload));
}

exports.watchTask = watchTask;
exports.lessTask = lessTask;
exports.vendorTask = vendorTask;
exports.jsTask = jsTask;
exports.imageTask = imageTask;
exports.htmlTask = htmlTask;
exports.browserSync = browserSync;
exports.browserSyncReload = browserSyncReload;
exports.default = series(parallel(htmlTask, imageTask, jsTask, lessTask, vendorTask, browserSync), watchTask);