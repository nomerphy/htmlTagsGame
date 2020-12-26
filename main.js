document.addEventListener("DOMContentLoaded", () => {
	// DOM ELEMENTS
	const gameContainer = document.querySelector(".game");
	const gameList = document.querySelector(".game__list");
	const progressBar = document.querySelector(".progress__bar");
	progressBar.style.width = "100%";
	const gameScore = document.querySelector(".game__score");
	const gameInput = document.querySelector(".game__input");
	const restartBtn = document.querySelector(".restart__btn");
	const restartWindow = document.querySelector('.game__restart');
	const finalScore = document.querySelector('.final__score');

	// Variables
	let score = 0;
	let time = 7;
	let startInterval;
	let body = document.body;

	// TAGS ARRAY
	const tagsArray = [
		"<!--...-->",
		"!DOCTYPE",
		"a",
		"abbr",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"bdi",
		"bdo",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"cite",
		"code",
		"col",
		"colgroup",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"i",
		"iframe",
		"img",
		"input",
		"ins",
		"kbd",
		"label",
		"legend",
		"li",
		"link",
		"main",
		"map",
		"mark",
		"meta",
		"meter",
		"nav",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"param",
		"picture",
		"pre",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"script",
		"section",
		"select",
		"small",
		"source",
		"span",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"svg",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"track",
		"u",
		"ul",
		"var",
		"video",
		"wbr",
	];

	gameScore.innerHTML = "Score: " + score + "/" + tagsArray.length;
	let prevTime = time * 1000;

	function startGame() {
		startInterval = setInterval(animateProgressBar, 10);
	}

	// Functions
	function checkForTag(e) {
		if (e.keyCode === 13) {
			const value = gameInput.value;
			if (tagsArray.includes(value)) {
				const item = document.createElement("li");
				item.classList.add("game__item");
				item.textContent = value;
				gameList.append(item);
				gameInput.value = "";

				for (i in tagsArray) {
					if (tagsArray[i] == value) {
						tagsArray.splice(i, 1);
						break;
					}
				}
				prevTime = time * 1000;

				++score;
				gameScore.innerHTML =
					"Score: " + score + "/" + tagsArray.length;
				if(score === 112) {
					clearInterval(startInterval);
					gameInput.style.pointerEvents = "none";
					gameInput.blur();
					restartWindow.classList.add('active');
					finalScore.textContent = 'all';
				}

			} else {
				gameContainer.classList.add("active");
				gameInput.value = "";
				body.style.background = "#b33939";

				setTimeout(() => {
					gameContainer.classList.remove("active");
					body.style.background = "";
				}, 400);
			}
		}
	}

	function animateProgressBar() {
		prevTime -= 10;
		let currentTime = time * 1000;

		const currentBarWidth = prevTime / currentTime;

		progressBar.setAttribute("style", `width: ${100 * currentBarWidth}%`);

		if (progressBar.style.width == "0%") {
			clearInterval(startInterval);
			gameInput.style.pointerEvents = "none";
			gameInput.blur();
			restartWindow.classList.add('active');
			finalScore.textContent = score;
		}
	}

	// Event listeners
	gameInput.addEventListener("keydown", checkForTag);
	gameInput.addEventListener("click", startGame);
	restartBtn.addEventListener('click', () => {
		document.location.reload();
	})
}); // DOMContentLoaded
