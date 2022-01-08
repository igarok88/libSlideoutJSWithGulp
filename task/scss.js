const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass")); //передаем в плагин gulp-sass компилятор sass
const sassGlob = require("gulp-sass-glob");
const webpCss = require("gulp-webp-css");

//Обработка SCSS
const scss = () => {
	//sourcemaps: true используется для создания карт, с помощью которых в браузере в отладчике кода будет видно в каком файле написан код
	return src(path.scss.src, { sourcemaps: app.isDev })
		.pipe(
			plumber({
				//уведомление в среде windows
				errorHandler: notify.onError((error) => ({
					title: "SCSS",
					message: error.message,
				})),
			})
		)
		.pipe(sassGlob()) //можно использовать маску когда указываем путь к файлу при импорте, по типу @import 'block/*.scss'
		.pipe(sass())
		.pipe(webpCss())
		.pipe(autoprefixer()) //добавляет префиксы к стилям, для поддержки старых браузеров
		.pipe(shorthand()) //заменяет св-во на более короткую форму
		.pipe(groupCssMediaQueries()) //групирует медиавыражения в конце файла
		.pipe(size({ title: "main.css" })) //показывает размер файла
		.pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(csso()) //минификация файла
		.pipe(size({ title: "main.min.css" }))
		.pipe(dest(path.scss.dest, { sourcemaps: app.isDev }));
};
module.exports = scss;
