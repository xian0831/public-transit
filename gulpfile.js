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
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var jsOrder = [
    'app/app.module.js',
    'app/**/*.js',
    'assets/**/*.js'

];

var vendorJsOrder = [
    'node_modules/angular/angular.js'
];


gulp.task('sw-scripts', function() {
    gulp.src('assets/js/sw.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));


});

gulp.task('scripts', ['sw-scripts'], function() {
    gulp.src(jsOrder)
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/assets/js'));


});

gulp.task('scripts-dist',['copy-JS','sw-scripts'], function() {
    gulp.src(jsOrder)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(rename({
            suffix: '.min'
        }))
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
    return gulp.src(['**/*.js','!node_modules/**','!dist/**/*.js'])
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

gulp.task('copy-JS', function() {
    gulp.src(vendorJsOrder)
        .pipe(gulp.dest('./dist/assets/vendor/js'));
});




gulp.task('default', ['styles', 'scripts', 'lint', 'copy-images','copy-html'],function() {
    gulp.watch('sass/**/*scss', ['styles']);
    gulp.watch(['**/*.js','!node_modules/**','!dist/**/*.js'],['lint']);
    gulp.watch('./index.html', ['copy-html']).on('change',browserSync.reload);
    gulp.watch(['**/*.js','!node_modules/**']).on('change',browserSync.reload);
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
