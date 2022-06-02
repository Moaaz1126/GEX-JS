var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass')(require('sass'));
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify")
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
const { dest, src } = require('vinyl-fs');
const GulpPug = require('gulp-pug');
const { watch, series } = require('gulp');
// var run = require('gulp-run-command')

gulp.task('pugT', function() {
    return gulp.src('src/pug/*.pug').pipe(pug()).pipe(gulp.dest('./'))
})

gulp.task('scssT', function() {
    return gulp.src('src/scss/*.scss').pipe(sass({outputStyle: 'compressed'})).pipe(concat('main.css')).pipe(gulp.dest('src/css/'))
})

gulp.task('css', function() {
    return gulp.src('src/css/*.css').pipe(concat('main.css')).pipe(gulp.dest('src/css/'))
})

gulp.task('js1', function() {
    return gulp.src('src/utils/components/scripts/*.js').pipe(uglify()).pipe(gulp.dest('public/scripts/'))
})

gulp.task('js2', function() {
    return gulp.src('src/utils/components/background/*.js').pipe(concat('background.js')).pipe(uglify()).pipe(gulp.dest('public/'))
})

gulp.task('js3', function() {
    return gulp.src('src/utils/components/PopUpScripts/*.js').pipe(concat('popUp.js')).pipe(uglify()).pipe(gulp.dest('public/'))
})

gulp.task('toDist', function() {
    gulp.src('public/*.js').pipe(gulp.dest('dist/'));
    gulp.src('public/scripts/main.js').pipe(gulp.dest('dist/scripts/'));
    gulp.src('public/scripts/popUp.js').pipe(gulp.dest('dist/scripts/'));
    gulp.src('public/scripts/*.js').pipe(gulp.dest('dist/scripts/'));
    gulp.src('src/css/main.css').pipe(cleanCSS()).pipe(replace('../fonts/', './')).pipe(gulp.dest('dist/assets/'));
    gulp.src('src/fonts/*.ttf').pipe(gulp.dest('dist/assets/'));
    gulp.src('public/icon/*.*').pipe(gulp.dest('dist/'));
    gulp.src('public/*.json').pipe(replace('icon/icon', 'icon')).pipe(replace('../index.html', 'index.html')).pipe(replace('../src/images/', 'assets/')).pipe(gulp.dest('dist/'));
    gulp.src('public/icon/*.*').pipe(gulp.dest('dist/'))
    gulp.src('src/images/*.*').pipe(gulp.dest('dist/assets/'));
    gulp.src('index.html').pipe(replace('src/css/', 'assets/')).pipe(replace('src/images/', 'assets/')).pipe(replace('public/background.js', 'background.js')).pipe(replace('public/scripts/', 'scripts/')).pipe(replace('public/', './')).pipe(gulp.dest('dist/'));
    return gulp.src('pages/*.*').pipe(gulp.dest('dist/pages/'))
})

gulp.task('build2', gulp.series('toDist'), () => {
    gulp.src('index.html').pipe(notify('Done build'))
});
gulp.task('build', gulp.series('pugT', 'scssT', 'css', 'js1', 'js2', 'js3', 'build2'), () => {

});

gulp.task('run', gulp.series('pugT', 'scssT', 'css', 'js1', 'js2', 'js3'), () => {
    gulp.src('index.html').pipe(notify('Done build'))
})


gulp.task('watch_build', function() {
    gulp.watch(['src/*.*', 'src/*/*.*', 'public/*.*/', 'public/*/*.*', 'pages/*.*', 'gulpFile.js', 'index.html', 'jest.config.js'], gulp.series('build'));
})
gulp.task('watch_run', function() {
    gulp.watch(['src/*.*', 'src/*/*.*', 'public/*.*/', 'public/*/*.*', 'pages/*.*', 'gulpFile.js', 'index.html', 'jest.config.js', 'manifest.json'], gulp.series('run'));
})

exports.default = gulp.series('build')