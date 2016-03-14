/**
 * Created by andrew on 3/11/16.
 */
/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var jasmine = require('gulp-jasmine-phantom');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('scripts', function() {
    gulp.src(['app/**/*.js','assets/**/*.js'])
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('scripts-dist', function() {
    gulp.src(['app/**/*.js','assets/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('styles',function(){
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());

});

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('copy-images', function() {
    gulp.src('assets/img/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-html', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
});




gulp.task('default', function() {
    gulp.watch('sass/**/*scss', ['styles', 'lint', 'copy-images','copy-html']);
    gulp.watch('**/*.js',['lint']);
    gulp.watch('/index.html', ['copy-html']);
    browserSync.init({
        server: './dist',
        port: 8080
    });
});

gulp.task('dist', [
    'copy-html',
    'copy-images',
    'styles',
    'lint',
    'scripts-dist'
]);

