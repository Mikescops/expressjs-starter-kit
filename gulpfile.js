var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    node;

const build = ['minify-css', 'minify-js', 'server'];


/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})


/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', build, function() {
  gulp.watch(['./app.js', './**/*.js', './**/*.html'], build); 
});


/**
 * $ gulp minify-js
 * description: compress all js files and output them in the dist folder
 */
gulp.task('minify-js', function() {
  gulp.src('public/assets/js/*.js')
    .pipe(minify({
        noSource : true,
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
        ignoreFiles: ['.min.js']
    }))
    .pipe(gulp.dest('public/assets/dist'))
});


/**
 * $ gulp minify-css
 * description: compress all css files and output them in the dist folder
 */
gulp.task('minify-css', () => {
  return gulp.src('public/assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/assets/dist'));
});


// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})