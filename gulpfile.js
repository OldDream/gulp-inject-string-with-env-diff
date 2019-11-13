var gulp = require('gulp'),
    inject = require('gulp-inject-string'),
    clean = require('gulp-clean');

var prod = process.env.NODE_ENV == 'production'

var jsURL = prod ? 'prodprodprodprodprodprod' : 'devdevdevdevdevdevdevdevdevdevdevdev'
var outputDest = prod ? 'build' : 'build-dev'

gulp.task('inject:replace', function () {
    return gulp.src('src/index.html')
        .pipe(inject.replace('<!-- inject publicInteraction js here -->', jsURL))
        .pipe(gulp.dest(outputDest));
});

gulp.task('cleanProd', function () {
    return gulp.src('./build', { read: false, allowEmpty: true })
        .pipe(clean());
})
gulp.task('cleanDev', function () {
    return gulp.src('./build-dev', { read: false, allowEmpty: true })
        .pipe(clean());
})

gulp.task('replaceJsPath', gulp.series('inject:replace'));

gulp.task('default', gulp.series(gulp.parallel('cleanProd', 'cleanDev'), 'inject:replace'));
