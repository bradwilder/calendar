var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('build', function(cb)
{
	exec('ng build', function (err, stdout, stderr)
	{
		console.log(stdout);
		cb(err);
	});
});

gulp.task('ngWatch', function(cb)
{
	exec('ng serve --proxy-config proxy.conf.json', function (err, stdout, stderr)
	{
		console.log(stdout);
		cb(err);
	});
});
