const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// Compile SCSS into CSS
function style() {
    // 1. Where is my SCSS file
    return gulp.src('./app/scss/**/*.scss')
    // 2. Pass that file through SCSS compiler
    .pipe(sass())
    // 3. Where do I save the compiled CSS?
    .pipe(gulp.dest('./dist/css'))
    // 4. Stream changes to all browsers
    .pipe(browserSync.stream());
}

// Watch for changes and update automatically
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // Watch for SCSS changes
    gulp.watch('./app/scss/**/*.scss', style);
    // Watch for changes in index.html and reload when detected
    gulp.watch('./*.html').on('change', browserSync.reload);
    // Watch for changes in script.js and reload when detected
    gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;