const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");

//Обработка CSS
const css = () => {
	//sourcemaps: true используется для создания карт, с помощью которых в браузере в отладчике кода будет видно в каком файле написан код
	return src(path.css.src, { sourcemaps: app.isDev })
		.pipe(
			plumber({
				//уведомление в среде windows
				errorHandler: notify.onError((error) => ({
					title: "CSS",
					message: error.message,
				})),
			})
		)
		.pipe(concat("main.css")) //объеденить все файлы стилей в один
		.pipe(cssimport()) //заменяет все дерективы @import в css файле на их содержимое
		.pipe(webpCss())
		.pipe(autoprefixer()) //добавляет префиксы к стилям, для поддержки старых браузеров
		.pipe(shorthand()) //заменяет св-во на более короткую форму
		.pipe(groupCssMediaQueries()) //групирует медиавыражения в конце файла
		.pipe(size({ title: "main.css" })) //показывает размер файла
		.pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(csso()) //минификация файла
		.pipe(size({ title: "main.min.css" }))
		.pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
};
module.exports = css;
