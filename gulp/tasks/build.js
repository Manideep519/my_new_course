var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();



gulp.task('previewDist', function(){
	browserSync.init({
	  notify: false,
	  server: {
	    baseDir: "docs"
	  }
	});
});


gulp.task('deletedist', function(){
	return del("./docs");
});


gulp.task('copyGeneralFiles', ['deletedist'], function(){
	var paths = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

	return gulp.src(paths)
	.pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deletedist'], function(){
	return gulp.src(['./app/assets/images/**/*'])
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest("./docs/assets/images"));
});


gulp.task('usemin', ['deletedist', 'styles', 'scripts'], function(){
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [function(){return rev()}, function(){return cssnano()}],
		js: [function(){return rev()}, function(){return uglify()}]
	}))
	.pipe(gulp.dest("./docs"));
});

gulp.task('build',['deletedist', 'copyGeneralFiles', 'optimizeImages', 'usemin']);