const { src, dest, series, parallel, watch } = require('gulp');
const rm = require('gulp-rm');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem'); //.pipe(px2rem())
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');


const styles = ['src/styles/normalize.css',
  'src/main.css']
const scripts = ['src/jquery.touchSwipe.min.js',
  'src/main.js']

function clean() {
  return src('dist/**/*', { read: false }).pipe(rm());
};
function copyHtml() {
  return src('src/*.html')
    .pipe(dest('dist'));
};
function copyCss() {
  return src(styles)
    .pipe(concat('main.css'))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gcmq())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist'));
};
function copyJs() {
  return src('src/*.js')
    .pipe(concat('main.js', { newLine: ';' }))
    // .pipe(uglify)    ----not worked----
    .pipe(dest('dist'));
};
function copyImg() {
  return src('src/img/**/*')
    .pipe(dest('dist/img'));
};

exports.default = series(clean, parallel(copyHtml, copyCss, copyJs, copyImg));

// watch('./src/styles/main.scss', series(clean, styling));