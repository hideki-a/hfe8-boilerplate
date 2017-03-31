/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *  Copyright 2017 Hideki Abe All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Generate HTML
gulp.task('pug', () => {
  return gulp.src(['src/**/*.pug', '!src/includes/*.pug'])
    .pipe($.newer('.tmp/pug'))
    .pipe($.pug({
      pretty: true
    }).on('error', $.notify.onError((error) => {
      return error.message;
    })))
    .pipe(gulp.dest('.tmp/pug'))
    .pipe(gulp.dest('dist/'))
});

// Transforms and automatically prefix stylesheets
gulp.task('styles', () => {
  return gulp.src([
    'src/**/*.pcss',
    '!src/**/_*.pcss',
  ])
    .pipe($.newer('.tmp/css'))
    .pipe($.sourcemaps.init())
    .pipe($.postcss())
    .pipe(gulp.dest('.tmp/css'))
    .pipe($.rename((path) => {
      path.dirname = path.dirname.replace('pcss', 'css');
      path.extname = ".css";
    }))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});

// Lint JavaScript
gulp.task('eslint', () =>
  gulp.src(['src/**/js/src/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
gulp.task('scripts', () =>
    gulp.src([
        'src/**/js/src/*.js',
      ])
      // .pipe($.newer('.tmp/js'))
      // .pipe($.sourcemaps.init())
      .pipe($.babel())
      // .pipe($.sourcemaps.write())
      // .pipe(gulp.dest('.tmp/js'))
      // .pipe($.concat('main.min.js'))
      // .pipe($.uglify({preserveComments: 'some'}))
      // Output files
      // .pipe($.size({title: 'scripts'}))
      .pipe($.rename((path) => {
        path.dirname = path.dirname.replace('src', '');
      }))
      // .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('dist'))
);

// Optimize images
gulp.task('images', () =>
  gulp.src('src/**/images/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    'src/**/*.js',
    '!src/**/js/src/*.js',
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist'], { dot: true, force: true }));

// Serve
// ghostMode: Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
//
// server: ['dist/', 'src/']
// Images load from src directory. Other files load from dist directory.
gulp.task('serve', () => {
  browserSync({
    server: ['dist/', 'src/'],
    port: 3501,
    ghostMode: false,
    startPath: '/',
  });

  gulp.watch(['src/**/*.pug'], ['pug', reload]);
  gulp.watch(['src/**/*.pcss', 'postcss.config.js'], ['styles', reload]);
  gulp.watch(['src/**/js/src/*.js'], ['eslint', 'scripts', reload]);
  gulp.watch(['src/**/images/*'], reload);
});

// Default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    ['pug', 'styles', 'scripts'],
    'serve',
    cb
  )
);

// Publish production files
gulp.task('publish', ['clean'], cb =>
  runSequence(
    ['pug', 'styles', 'scripts', 'images', 'copy'],
    cb
  )
);
