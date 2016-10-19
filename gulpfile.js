var gulp=require("gulp"),
sass=require('gulp-sass'),
messyAA=require("gulp-uglify"),
rename=require("gulp-rename"),
cssmin= require("gulp-cssmin"),
sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task("js",function(){

  gulp.src('./js/*.js')
  .pipe(messyAA())
  .pipe(rename({extname:"min.js"}))
  .pipe(gulp.dest('./build/js'));
});

    gulp.task("css", function(){
     return gulp.src("./css/*.css")
     .pipe(cssmin())
     .pipe(rename({extname: ".min.css"}))
     .pipe(gulp.dest("./build/css"));
  })
//Watch task
  gulp.task("watch",function(){
    gulp.watch('./*.js',["js"])
    gulp.watch('./*.css',["css"])
    gulp.watch('sass/**/*.scss',['styles']);
  });
