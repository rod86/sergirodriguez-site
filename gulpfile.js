var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    cssMin  = require('gulp-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    del     = require('del');

var srcPath = './_assets',
    buildPath = './_build/assets',
    javascriptFiles = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/@glidejs/glide/dist/glide.min.js',
        srcPath + '/js/main.js'
    ],
    fontFiles = [
        'node_modules/font-awesome/fonts/*',
        srcPath + '/fonts/*'
    ];

// Clean tasks
gulp.task('clean:css', function() {
    return del(buildPath + '/css');
}); 
gulp.task('clean:js', function() {
    return del(buildPath + '/js');
}); 
gulp.task('clean:fonts', function() {
    return del(buildPath + '/fonts');
});

// Sass parser
gulp.task('sass', ['clean:css'], function() {
    gulp.src(srcPath + '/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath + '/css'));
});

// Javascript
gulp.task('js', ['clean:js'], function () {
    return gulp.src(javascriptFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + '/js'));
});

// Fonts
gulp.task('fonts', ['clean:fonts'], function() {
    return gulp.src(fontFiles)
        .pipe(gulp.dest(buildPath + '/fonts/'));
});

gulp.task('watch-assets', function() {
    gulp.watch([srcPath + '/sass/**/*.scss'], ['sass']);
    gulp.watch([srcPath + '/js/**/*.js'], ['js']);
});

gulp.task('clean', ['clean:css', 'clean:js', 'clean:fonts']);
gulp.task('build', ['js', 'sass', 'fonts']);
gulp.task('watch', ['build', 'watch-assets']);
