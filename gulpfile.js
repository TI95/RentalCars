const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');

const paths = {

    html: {
        src: 'index.html'

    },

    styles: {
        src: 'src/styles/**.less'
    },

    scripts: {
        src: 'src/scripts/**.js'
    },

    libs: {
        src: 'src/libs/**.js'
    },

    additional: {
        src: 'src/styles/additional/**/*'
    },

    img: {
        src: 'src/images/*'
    },

    fonts: {
        src: 'src/fonts/*'
    }
}


function html() {
    return (gulp.src(paths.html.src))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/'));

}


function styles() {
    return (gulp.src(paths.styles.src))
        .pipe(browserSync.stream())
        .pipe(less())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('dist/src/styles'));
}


function scripts() {
    return (gulp.src(paths.scripts.src))
        .pipe(browserSync.stream())
        .pipe(minify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('dist/src/scripts'));
}

function libs() {
    return (gulp.src(paths.libs.src))
        .pipe(gulp.dest('dist/src/libs'));
}

function additional() {
    return (gulp.src(paths.additional.src))
        .pipe(gulp.dest('dist/src/styles/additional'));
}

function img() {
    return (gulp.src(paths.img.src))
        .pipe(gulp.dest('dist/src/images'));
}

function fonts() {
    return (gulp.src(paths.fonts.src))
        .pipe(gulp.dest('dist/src/fonts'));
}

function watch() {
    browserSync.init({
        server: "./src/"
    });
    gulp.watch(paths.html.src).on('change', browserSync.reload)
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

watch = gulp.series(gulp.parallel(styles, scripts))

const build = gulp.series(html, styles, scripts, libs, additional, img, fonts)

exports.build = build
