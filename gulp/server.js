var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('serve', function(cb)
{
	exec('node server', function (err, stdout, stderr)
	{
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});
