/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *  Copyright 2016 Hideki Abe All rights reserved.
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
// import perfectionist from 'perfectionist';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Generate HTML
gulp.task('pug', () => {
  return gulp.src('src/**/*.pug')
    .pipe($.pug({
      pretty: true
    }).on('error', $.notify.onError((error) => {
      return error.message;
    })))
    .pipe(gulp.dest('dist/'))
});

// Compile and automatically prefix stylesheets
// gulp.task('styles', () => {
//   const AUTOPREFIXER_BROWSERS = [
//     'last 2 versions',
//     'ie >= 9',
//   ];
//   const PROCESSORS = [
//     autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
//     mqpacker(),
//     // perfectionist(),
//   ];

//   // For best performance, don't add Sass partials to `gulp.src`
//   return gulp.src([
//     '../src/css/*.css'
//   ])
//     .pipe($.newer('.tmp/css'))
//     .pipe($.sourcemaps.init())
//     .pipe($.postcss(PROCESSORS))
//     .pipe(gulp.dest('.tmp/css'))
//     .pipe($.size({ title: 'styles' }))
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('../dist/css'));
// });

// Clean output directory
gulp.task('clean:tmp', () => del(['.tmp'], { dot: true }));
gulp.task('clean:dist', () => del(['dist'], { dot: true, force: true }));

// Serve
// ghostMode: Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
gulp.task('serve', () => {
  browserSync({
    server: 'dist/',
    port: 3501,
    ghostMode: false,
    startPath: '/',
  });

  gulp.watch(['src/**/*.pug'], ['pug', reload]);
  // gulp.watch(['src/css/*.css'], ['styles', reload]);
});

// Default task
gulp.task('default', ['clean:tmp'], cb =>
  runSequence(
    ['pug'],
    'serve',
    cb
  )
);

// Publish production files
gulp.task('publish', ['clean:dist'], cb =>
  runSequence(
    ['pug'],
    'styles',
    cb
  )
);
