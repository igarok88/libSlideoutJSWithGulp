const { src, dest } = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");

//Обработка IMG
const img = () => {
	return src(path.img.src)
		.pipe(
			plumber({
				//уведомление в среде windows
				errorHandler: notify.onError((error) => ({
					title: "IMG",
					message: error.message,
				})),
			})
		)
		.pipe(newer(path.img.dest)) // если изображение уже обработано, то его пропускаем
		.pipe(webp())
		.pipe(dest(path.img.dest))
		.pipe(src(path.img.src))
		.pipe(newer(path.img.dest))
		.pipe(gulpif(app.isProd, imagemin(app.imagemin))) //imagemin изменение размера изображения. gulpif - выполняет imagemin если первый параметр true
		.pipe(dest(path.img.dest));
};
module.exports = img;
