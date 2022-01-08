const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create(); //получаем экземпляр сервера

//Конфигурация
const path = require("./config/path.js");
const app = require("./config/app.js");

//Подключаем Задачи
const clear = require("./task/clear.js");
const html = require("./task/html.js");
const scss = require("./task/scss.js");
const js = require("./task/js.js");
const img = require("./task/img.js");
const font = require("./task/font.js");

//Сервер
const server = () => {
	// инициализируем сервер
	browserSync.init({
		server: {
			baseDir: path.root, //в настройках указываем дирректорию в которой будет запускатся сервер
		},
	});
};

//Наблюдение
const watcher = () => {
	watch(path.html.watch, html).on("all", browserSync.reload);
	watch(path.scss.watch, scss).on("all", browserSync.reload);
	watch(path.js.watch, js).on("all", browserSync.reload);
	watch(path.img.watch, img).on("all", browserSync.reload);
	watch(path.font.watch, font).on("all", browserSync.reload);
};

const build = series(clear, parallel(html, scss, js, img, font));

const dev = series(build, parallel(watcher, server));

//Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

//Сборка
exports.default = app.isProd ? build : dev;

//запускаем сборку gulp - для dev, gulp --production - для продакшн, или npm start/npm run build
