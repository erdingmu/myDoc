/**
 * 第三方插件
 * gulp-scss
 * gulp-minify-css
 * gulp-rename
 */

/**
 * .scss文件 => css文件 => 压缩 => min.css
*/

const gulp = require('gulp')
const scss = require('gulp-sass')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const minifyCSS = require('gulp-minify-css')

gulp.task('scss', () => {
    return gulp.src('stylesheet/index.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('index.mini.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

/**
 * 批量处理CSS
 */
gulp.task('scssAll', () => {
    return gulp.src('stylesheet/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

/**
 * 处理JS
 */
gulp.task('scripts', () => {
    return gulp.src(['js/**/*.js', '!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.mini',
        extname: '.js'
    }))
    .pipe(gulp.dest(['dist/js']))
    .pipe(connect.reload())
})

/**
 * 处理html
 */
gulp.task('copy-html', () => {
    return gulp.src('*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

/**
 * 处理图片
 */
gulp.task('images', () => {
    return gulp.src('images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})

/**
 * 一次性处理多个任务
 */
// gulp.task('build', ['scss', 'scripts', 'copy-html', 'scssAll', 'images'], () => {
//     console.log('项目建立成功')
// })

// gulp@4.0.2
gulp.task('build', gulp.parallel(['scss', 'scripts', 'copy-html', 'scssAll', 'images']), () => {
    console.log('项目建立成功')
})

/**
 * 监听
 */
// gulp.task('watch', () => {
//     gulp.watch('stylesheet/index.scss', ['scss'])
//     gulp.watch('stylesheet/*.scss', ['scssAll'])
//     gulp.watch(['*.js', '!gulpfile.js'], ['scripts'])
//     gulp.watch('*.html', ['copy-html'])
//     gulp.watch('images/**/*', ['images'])
// })

// gulp@4.0.2
gulp.task('watch', () => {
    gulp.watch('stylesheet/index.scss', gulp.parallel(['scss']))
    gulp.watch('stylesheet/*.scss', gulp.parallel(['scssAll']))
    gulp.watch(['js/**/*.js', '!gulpfile.js'], gulp.parallel(['scripts']))
    gulp.watch('*.html', gulp.parallel(['copy-html']))
    gulp.watch('images/**/*', gulp.parallel(['images']))
})

/**
 * 启动服务器 gulp-connect
 */
const connect = require('gulp-connect')
gulp.task('server', () => {
    connect.server({
        root: 'dist',
        port: 8887,
        livereload: true
    })
})

/**
 * 启动默认任务
 */
// gulp.task('default', ['watch', 'server'], () => {
//     console.log('Success')
// })

// gulp@4.0.2
gulp.task('default', gulp.parallel(['watch', 'server']))