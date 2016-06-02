var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('combine_vendor_js', function() {
    return gulp.src('public_html/js/vendor/*.js')
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public_html/js/'))
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "http://localhost/",
        notify: false
    });

    gulp.watch("public_html/scss/*.scss", ['sass']);
    gulp.watch("public_html/*.html").on('change', browserSync.reload);
    gulp.watch("ee-templates/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public_html/scss/*.scss")
        .pipe(sass({outputStyle:'expanded', indentWidth:'4'}).on('error', sass.logError))
        .pipe(gulp.dest("public_html/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
