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
  })
});


// Just browserifyies  looking for app.js
gulp.task('browserify', function() {
    return browserify('./src/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
});

// Just compiles ts into js.
gulp.task('compile', function(){
  return gulp.src('src/ts/app.ts')
    .pipe(ts({
      noImplicitAny: true,
      out: 'app.js'
    }))
    .pipe(gulp.dest('./src/js'));
});

// Build app.ts by browserifying it to get dependencies and run through tsify to compile typescript to javascript
gulp.task('build', function(){
  browserify()
    .add("./src/ts/app.ts")
    .plugin(tsify, { noImplicitAny: true})
    .bundle()
    .on('error', function(error){console.error(error.toString());})
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Setup watch files
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./src/ts/app.ts', ['build']);
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/**/*.+(html|htm)', ['html']);
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

gulp.task('default', ['build'], function(){

});
