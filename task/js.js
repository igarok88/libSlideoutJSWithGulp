const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");

//Обработка JS
const js = () => {
	//sourcemaps: true используется для создания карт, с помощью которых в браузере в отладчике кода будет видно в каком файле написан код
	return src(path.js.src, { sourcemaps: app.isDev })
		.pipe(
			plumber({
				//уведомление в среде windows
				errorHandler: notify.onError((error) => ({
					title: "JS",
					message: error.message,
				})),
			})
		)
		.pipe(babel()) //подключаем пресет в файле package.json, переделывает код для более старых версий браузеров
		.pipe(webpack(app.webpack))
		.pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
};
module.exports = js;
