var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

build();
build(true);

function build(minify) {
    var bundler = browserify("./src/angular-event-dispatcher.js", { debug: true })
        .transform(babelify);

    var outputFileName = "dist/angular-event-dispatcher.js";

    if (minify) {
        bundler.transform('uglifyify');
        outputFileName = "dist/angular-event-dispatcher.min.js";
    }

    bundler.bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(fs.createWriteStream(outputFileName));
}