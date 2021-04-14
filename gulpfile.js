const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const { parallel } = require('gulp');
const browserSync = require('browser-sync').create();

function css_style(done) {
    gulp.src('./src/styles/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/styles'))
    .pipe(browserSync.stream());

    done();
}

function browserReload(done) {
    browserSync.reload();

    done();
}

function bs(done) {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
        port: 3000
    });

    done();
}


function watchFiles() {
    gulp.watch('./src/styles/scss/**/*', css_style);
    gulp.watch('./src/**/*.html', browserReload);
    gulp.watch('./src/scripts/**/*.js', browserReload);
}

exports.default = parallel(bs, watchFiles);