var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('server', function()
{
	gulp.start('dbServer');
	gulp.start('appServer');
});

gulp.task('appServer', function(cb)
{
	exec('node server', function (err, stdout, stderr)
	{
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('dbServer', function(cb)
{
	exec('mongod', function (err, stdout, stderr)
	{
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});
