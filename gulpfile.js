const { src, dest, parallel, series, watch } = require('gulp');
const server = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const rename = require("gulp-rename");

const config = {
    root: 'app',
    get sassFiles() { return `${this.root}/sass/*.scss` },
    get jsFiles() { return `${this.root}/js/*.js` },
    get pugFiles() { return `${this.root}/*.pug` },
    get staticFiles() { return `${this.root}/static/**/*` },

}

function html() {
    return src(config.pugFiles)
        .pipe(pug())
        .pipe(dest('public/'))
        .pipe(server.stream())
}

function css() {
    return src(config.sassFiles)
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename("app.min.css"))
        .pipe(dest('public/style'))
        .pipe(server.stream())
}

function js() {
    return src(config.jsFiles, { sourcemaps: true })
        .pipe(concat('app.min.js'))
        .pipe(dest('public/js', { sourcemaps: true }))
        .pipe(server.stream())
}

function serve(done) {
    server.init({
        server: {
            baseDir: "./public"
        }
    });
    done();
}

function static() {
    return src(config.staticFiles)
        .pipe(dest('public/'))
}

function reload(done) {
    server.reload();
    done();
}

function watchFiles(done) {
    watch('app/**/*.scss', series(css, reload));
    watch('app/**/*.pug', series(html, reload));
    watch('app/**/*.js', series(js, reload));
    watch('app/static/**/*', series(static, reload));
    done()
};




exports.js = js;
exports.css = css;
exports.html = html;
exports.dev = series(watchFiles, parallel(html, css, js, static)
    , serve)
exports.default = parallel(html, css, js, static);