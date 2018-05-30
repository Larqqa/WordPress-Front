const gulp = require('gulp');
const sass = require('gulp-sass');

function swallowError(error) {
  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

function funcSass () {
  return gulp.src(['src/sass/*.sass', '!src/sass/functions.sass'])
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('src'))
}

function serve () {
  gulp.watch(['src/sass/*.sass'], funcSass);
}

gulp.task('default', serve);
