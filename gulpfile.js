var gulp = require('gulp');  // Main gulp module
var ts = require('gulp-typescript'); // Compiles Typescript
var del = require('del'); // Deletes files
var browserify = require('browserify'); // Combines js files
var uglify = require('gulp-uglify'); // Minifies files
var glob = require('glob'); // Lets you use * in filenames
// var requirejs = require('requirejs');
var tsify = require('tsify'); // Compiles typescript after combining with browserify
var source = require('vinyl-source-stream'); // Converts output file to stream
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Setup browser-sync
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});


// Just browserifyies  looking for app.js Not being used right now.
/*
gulp.task('browserify', function() {
    return browserify('./src/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
});
*/
// Just compiles ts into js. Old, didn't work for what I needed.
/*
gulp.task('compile', function(){
  return gulp.src('./src/ts/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      declaration: true,
      module: 'amd',
      out: 'app.js'
    }))
    .pipe(gulp.dest('./src/js'));
});
*/
// Build app.ts by browserifying it to get dependencies and run through tsify to compile typescript to javascript
gulp.task('build', function(){
  browserify()
    .add("./src/ts/app.ts")
    .plugin(tsify, { noImplicitAny: true, target: 'ES5' })
    .bundle()
    .on('error', function(error){console.error(error.toString());})
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Setup watch files
gulp.task('watch', ['build', 'scripts', 'css', 'browserSync'], function(){
  gulp.watch('./src/ts/*.ts', ['build']);
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/**/*.+(html|htm)', ['html']);
  gulp.watch('./src/css/**/*.css', ['css']);
});

gulp.task('html', function(){
  return gulp.src('./src/**/*.+(html|htm)')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Concatenate and minifiy scripts
gulp.task('scripts', function(){
  return gulp.src('./src/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('css', function(){
  return gulp.src('./src/css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('default', ['watch'], function(){

});
