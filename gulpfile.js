var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
const htmlMin = require('gulp-htmlmin');
const imageMin = require('gulp-imagemin');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');


//minify html
gulp.task('html', () => {
  gulp.src('index.html')
  .pipe(htmlMin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest('cabodyshopllc.com/'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

//compress and move image to public folder
gulp.task('img', () => {
  gulp.src('img/*')
  .pipe(imageMin([
    imageMin.gifsicle({interlaced: true}),
    imageMin.jpegtran({progressive: true}),
    imageMin.optipng({optimizationLevel: 5}),
    imageMin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
  .pipe(gulp.dest('cabodyshopllc.com/img'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/creative.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/creative.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('cabodyshopllc.com/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/*')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('cabodyshopllc.com/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('cabodyshopllc.com/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('cabodyshopllc.com/vendor/jquery'))

    gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest('cabodyshopllc.com/vendor/magnific-popup'))

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest('cabodyshopllc.com/vendor/scrollreveal'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('cabodyshopllc.com/vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['html', 'less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'cabodyshopllc.com'
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'html', 'less', 'minify-css', 'minify-js', 'img'], function() {
    gulp.watch('index.html', ['html']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('img/*.*', ['img'])
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
