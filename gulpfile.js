var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    cssMin  = require('gulp-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify');

var srcPath = './_assets',
    buildPath = './_build',
    javascriptFiles = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ],
    fontFiles = [
        'node_modules/font-awesome/fonts/*'
    ];

// Styles
gulp.task('sass', function() {
    gulp.src(srcPath + '/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath + '/css'));
});

// Javascript
gulp.task('js', function () {
    return gulp.src(javascriptFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + '/js'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(fontFiles)
        .pipe(gulp.dest(buildPath + '/fonts'));
});

gulp.task('watch', function() {
    gulp.watch([srcPath + '/sass/**/*.scss'], ['sass']);
});

gulp.task('build', ['js', 'sass', 'fonts']);
gulp.task('default', ['build', 'watch']);
