var gulp = require("gulp");
var url = require("url");
var path = require("path");
var fs = require("fs");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
var swiperData = require("./src/data/swiper.json");
var foodData = require("./src/data/food.json");
gulp.task("loadSource", function() {
    return gulp.src("./src/scss/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
})

gulp.task("meituandev", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090,
            // open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    return res.end();
                }
                if (pathname === "/api/swiper") {
                    // 接口
                    res.end(JSON.stringify({ code: 0, data: swiperData }))
                } else if (pathname === "/api/foodList") {
                    res.end(JSON.stringify({ code: 0, data: foodData }))
                } else {
                    // 文件
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})
gulp.task("watch", function() {
    return gulp.watch("./src/scss/index.scss", gulp.series("loadSource"))
})
gulp.task("dev", gulp.series("meituandev", "watch"));