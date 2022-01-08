import "../../node_modules/slideout/dist/slideout.min.js";
const button = document.querySelector(".toggle");
const pane = document.querySelector(".pane");

button.addEventListener("click", () => {
	pane.classList.toggle("open");
});
