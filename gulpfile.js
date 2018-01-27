var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    cssMin  = require('gulp-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify');

var srcPath = './_assets',
    buildPath = './_src',
    javascriptFiles = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ];

gulp.task('sass', function() {
    gulp.src(srcPath + '/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('js', function () {
    return gulp.src(javascriptFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('build', ['js', 'sass']);
