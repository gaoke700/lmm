var gulp = require('gulp');
var gulpScss = require('gulp-sass');
var gulpCssMin = require('gulp-cssmin');
var gulpUglify = require('gulp-uglify');
var del = require('del');
var base64 = require('gulp-base64');
var md5 = require("gulp-md5-plus");

gulp.task('clean-dist', function (cb) {
    return del(['dist'], cb);
});
gulp.task('clean-md5', function (cb) {
    return del(['md5'], cb);
});


/****************  gulp dev代码  *****************/
gulp.task('min-js', function() {
    return gulp.src(['src/**/*.js'])
      .pipe(gulpUglify())
      .pipe(gulp.dest('dist'));
});
gulp.task('transfer-html', function() {
    return gulp.src(['src/**/*.html'])
      .pipe(gulp.dest('dist'));
});
gulp.task('transfer-music', function() {
    return gulp.src(['src/music/**/*.**'])
      .pipe(gulp.dest('dist/music'));
});
gulp.task('min-css', function() {
    return gulp.src(['src/**/*.scss'])
      .pipe(gulpScss())
      .pipe(gulpCssMin())
      .pipe(base64({
        maxImageSize: 20*1024
      }))
      .pipe(gulp.dest('dist'));
});
gulp.task('dev-img', function() {
    return gulp.src(['src/img/**/*.{jpg,png,jpeg,gif,svg}'])
      .pipe(gulp.dest('dist/img'));
});
gulp.task('dev-js', function() {
    return gulp.src(['src/**/*.js'])
      .pipe(gulp.dest('dist'));
});
gulp.task('dev-css', function() {
    return gulp.src(['src/**/*.scss'])
      .pipe(gulpScss())
      .pipe(gulp.dest('dist'));
});

gulp.task('md5-css' ,function() {
  return gulp.src('src/**/*.scss')
    .pipe(gulpScss())
    .pipe(md5(10 ,'src/**/*.html'))
    .pipe(gulp.dest('md5'));
});
gulp.task('md5-js' ,function() {
  return gulp.src('src/**/*.js')
    .pipe(md5(10 ,'src/**/*.html'))
    .pipe(gulp.dest('md5'));
});


gulp.task('watch', function(){
    gulp.watch(['src/**/*.**'], ['dev-img','dev-css','transfer-html','dev-js','transfer-music']);
});

gulp.task('dev', ['clean-dist'], function(){
    gulp.start('dev-img','dev-js','transfer-html','dev-css','transfer-music', 'watch');
});

//上线命令 gulp build
gulp.task('build', ['clean-dist'], function(){
    gulp.start('dev-img', 'min-js', 'min-css','transfer-html','transfer-music');
});

gulp.task('md5', ['clean-md5'], function(){
    gulp.start('md5-css');
});

