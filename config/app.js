const isProd = process.argv.includes("--production"); //при запуске команды с флагом --production, в переменную запишется true, иначе false

const isDev = !isProd;

module.exports = {
	isProd: isProd,
	isDev: isDev,

	htmlmin: {
		collapseWhitespace: isProd,
	},
	pug: {
		//минификация файла
		pretty: isDev,
		//передаем json файлы
		data: {
			news: require("../data/news.json"),
		},
	},
	webpack: {
		mode: isProd ? "production" : "development",
	},
	imagemin: {
		vebose: true, //vebose выводит размер файла до и после сжатия
	},
	fonter: {
		formats: ["ttf", "woff", "eot", "svg"],
	},
};
