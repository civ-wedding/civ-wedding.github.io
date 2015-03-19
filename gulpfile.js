var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var vulcanize = require('gulp-vulcanize');
var clean = require('gulp-clean');

gulp.task('server', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8075
  });
});

gulp.task('transform-client', function () {
  return gulp.src('client/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/client'));
});

gulp.task('copy-client', function () {
  return gulp.src('client/**/!(*.js)')
    .pipe(gulp.dest('dist/client'));
});

gulp.task('vulcanize', ['transform-client', 'copy-client'], function () {
  return gulp.src('dist/client/index.html')
    .pipe(vulcanize({
      dest: 'dist',
      inline: true,
      csp: true,
      strip: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-textures-for-deploy', function () {
  return gulp.src('dist/client/*.png')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src([
      'dist/client/**/*',
      'dist/index.*'
    ], {
      read: false
    })
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['client/**/*'], ['build-dev']);
});

gulp.task('build-dev', ['transform-client', 'copy-client'], function() {
  return gulp.src('dist/**/*')
    .pipe(connect.reload());
});

gulp.task('build-prod', ['copy-textures-for-deploy', 'vulcanize'])

gulp.task('default', ['clean', 'build-dev', 'server', 'watch']);
