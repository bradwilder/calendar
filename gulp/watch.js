var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['build'], function()
{
	browserSync.init(
	{
		notify: false,
		proxy: "http://localhost:3007"
	});
	
    watch('./src/app/**/*', function()
    {
		gulp.start('browserRefresh');
    });
});

gulp.task('browserRefresh', ['build'], function()
{
	browserSync.reload();
});
