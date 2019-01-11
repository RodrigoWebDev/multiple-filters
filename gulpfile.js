var gulp = require("gulp");
var clean = require("gulp-clean");

gulp.task("clean", function () {
    return gulp.src("dist")
        .pipe(clean());
});

gulp.task("copy", ["clean"], function () {
    return gulp.src("src/**/*")
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy"], function () {
    return gulp.start("clean-trash");
});

gulp.task("clean-trash", function () {
    return gulp.src("dist/sass")
        .pipe(clean());
});


