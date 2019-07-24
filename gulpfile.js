var gulp = require('gulp'),
	spawn = require('child_process').spawn,
	minify = require('gulp-minify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it
 */
gulp.task('server', async () => {
	if (node) node.kill()
	node = spawn('node', ['app.js'], { stdio: 'inherit' })
	node.on('close', (code) => {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
})

/**
 * $ gulp minify-js
 * description: compress all js files and output them in the dist folder
 */
gulp.task('minify-js', async () => {
	gulp.src('public/assets/js/*.js')
		.pipe(minify({
			noSource: true,
			ext: {
				src: '-debug.js',
				min: '.min.js'
			},
			ignoreFiles: ['.min.js']
		}))
		.pipe(gulp.dest('public/assets/dist'))
});

/**
 * $ gulp minify-css
 * description: compress all css files and output them in the dist folder
 */
gulp.task('minify-css', async () => {
	return gulp.src('public/assets/css/*.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public/assets/dist'));
});

/**
 * $ gulp build
 * description: prepare all assets
 */
gulp.task('build', gulp.parallel([
	'minify-css',
	'minify-js',
]));

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', gulp.series('build', 'server', watch = () => {
	gulp.watch(['./public/assets/css/*.css'], gulp.series('minify-css'));
	gulp.watch(['./public/assets/js/*.js'], gulp.series('minify-js'));
	gulp.watch(['./app.js', './**/*.js', './**/*.html'], gulp.series('server'));
}));

// clean up if an error goes unhandled.
process.on('exit', () => {
	if (node) node.kill()
});
