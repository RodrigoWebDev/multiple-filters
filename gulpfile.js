var gulp = require("gulp");
var clean = require("gulp-clean");
var usemin = require("gulp-usemin");
var uglify = require("gulp-uglify");

gulp.task("clean", function () {
    return gulp.src("dist")
        .pipe(clean());
});

gulp.task("copy", ["clean"], function () {
    return gulp.src("src/**/*")
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy"], function () {
    return gulp.start("clean-trash", "usemin");
});

gulp.task("clean-trash", function () {
    return gulp.src("dist/sass")
        .pipe(clean());
});

gulp.task("usemin", function () {
    return gulp.src("dist/**/*.html")
        .pipe(usemin({
            "js": [uglify]
        }))
        .pipe(gulp.dest("dist"));
});


