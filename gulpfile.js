/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var child = require('child_process');

// Define some paths.
var paths = {
  app_js: ['./public/javascripts/react/app.js'],
  js: ['./public/javascripts/**/*.js','./controllers/*.js','./models/*.js','./routes/*.js'],
};

gulp.task('server', function() {
  var server = child.spawn('node', ['./bin/www']);
});
// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('public/build/build.js'))
    .pipe(gulp.dest('./'));
});


// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'js','server']);
