const { src, dest, series, watch } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));

function clean() {
  return src('dist/**/*', { read: false }).pipe(rm());
};
function styling() {
  return src('src/styles/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist'));
};

exports.default = series(clean, styling);

// watch('./src/styles/main.scss', series(clean, styling));