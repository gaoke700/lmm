var gulp = require('gulp');
var gulpScss = require('gulp-sass');
var gulpCssMin = require('gulp-cssmin');
var gulpUglify = require('gulp-uglify');
// var gulpBabel = require('gulp-babel');
var gulpImagemin = require('gulp-imagemin');
var gulpRev = require('gulp-rev');
var gulpRevCollector = require('gulp-rev-collector');
var gulpInlineSource = require('gulp-inline-source');
// var base64 = require('gulp-base64');
// var eslint = require('gulp-eslint');
// var stylelint = require('gulp-stylelint');

var del = require('del');



var outputPath = 'angping';

gulp.task('clean-dist', function (cb) {
    return del(outputPath, cb);
});
gulp.task('clean-assets', function (cb) {
    return del(['assets'], cb);
});


/****************  gulp dev代码  *****************/
gulp.task('min-js', function() {
    return gulp.src(['src/**/*.js'])
      .pipe(gulpUglify())
      .pipe(gulp.dest(outputPath));
});
gulp.task('transfer-html', function() {
    return gulp.src(['src/**/*.html'])
      .pipe(gulp.dest(outputPath));
});
gulp.task('transfer-music', function() {
    return gulp.src(['src/music/**/*.**'])
      .pipe(gulp.dest('assets/music'));
});
gulp.task('min-css', function() {
    return gulp.src(['src/**/*.scss'])
      .pipe(gulpScss())
      .pipe(gulpCssMin())
      .pipe(gulp.dest('assets'));
});

gulp.task('dev-img', function() {
    return gulp.src(['src/img/**/*.{jpg,png,jpeg,gif,svg}'])
      .pipe(gulp.dest('assets/img'));
});
gulp.task('dev-js', function() {
    return gulp.src(['src/**/*.js'])
      .pipe(gulp.dest('assets'));
});
gulp.task('dev-css', function() {
    return gulp.src(['src/**/*.scss'])
      .pipe(gulpScss())
      .pipe(gulp.dest('assets'));
});

gulp.task('rev',['clean-assets'],function() {
  return gulp.src(['assets/**/*.**','!assets/**/*.html','!assets/**/*.json'])
    .pipe(gulpRev())
    .pipe(gulp.dest('assets'))
    .pipe(gulpRev.manifest())        //- 生成一个rev-manifest.json
    .pipe(gulp.dest('assets'));
});
gulp.task('rev-collector',['rev'],function() {
  return gulp.src(['assets/rev-manifest.json','src/**/*.html'])
    .pipe(gulpRevCollector())
    .pipe(gulp.dest('assets'));
});
gulp.task('inline-source',['rev-collector'],function() {
  return gulp.src(['assets/**/*.html'])
    .pipe(gulpInlineSource())
    .pipe(gulp.dest('view'));
});


gulp.task('watch', function(){
    gulp.watch(['src/**/*.**'], ['dev-img','dev-css','transfer-html','dev-js','transfer-music']);
});

gulp.task('dev', ['clean-dist'], function(){
    gulp.start('dev-img','dev-js','transfer-html','dev-css','transfer-music', 'watch');
});

//上线命令 gulp build
gulp.task('build', ['clean-dist'], function(){
    gulp.start('dev-img', 'min-js', 'min-css','transfer-html','transfer-music')
});

gulp.task('md5', function(){
    gulp.start('rev-collector');
});

