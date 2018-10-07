import gulp from 'gulp'
import sass from 'gulp-sass'
import copyAssets from 'gulp-css-copy-assets'

import stripCssComments from 'gulp-strip-css-comments'
import removeEmptyLines from 'gulp-remove-empty-lines'
import minify from 'gulp-minify'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import imagemin from 'gulp-imagemin'
import htmlreplace from 'gulp-html-replace'
import htmlmin from 'gulp-htmlmin'
import del from 'del'
const browserSync = require('browser-sync').create()
const cssmin = require('gulp-cssmin')
const rename=require('gulp-rename')


gulp.task('clean', () =>
          del('dist'))

gulp.task('browser-sync', () => 
    browserSync.init({
        server: {
            baseDir: ""}}))

gulp.task('docker-minify',() =>
          gulp.src(['src/js/*.js', 'src/js/*.mjs'])
          .pipe(minify())
          .pipe(gulp.dest('dist/js')))

gulp.task('docker-imagemin',() => 
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images')))

gulp.task('docker-css',() =>
          gulp.src('src/**/*.css')
          .pipe(gulp.dest('dist')))

gulp.task('docker-copy', () => 
          gulp.src('src/*.html')
          .pipe(htmlreplace({
              'js': {src:'js/site.min.js',
                     tpl: '<script src="%s" async></script>'}}))
          .pipe(htmlmin({collapseWhitespace: true}))
          .pipe(gulp.dest('dist/')))

gulp.task('docker-build',gulp.series(
    'docker-minify',
    'docker-css',
    'docker-imagemin',
    'docker-copy'))

gulp.task('default', gulp.series('clean','docker-build') )
