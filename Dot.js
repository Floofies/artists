window.addEventListener("load", function () {
	const canvas = document.querySelector("#glcanvas");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	function rand(maxLength = 0, maxInt = 9) {
		return Math.floor(Math.random() * (maxInt + 1));
	}
	// Points
	function point(ctx, x, y) {
		ctx.rect(x, y, 4, 4);
		ctx.stroke();
	}
	// Known Dots
	const dots = [];
	// Lines
	function drawLines() {
		const xy1 = dots.pop();
		if (dots.length === 0) return ctx.stroke();
		ctx.moveTo(xy1[0], xy1[1]);
		const xy2 = dots[dots.length === 1 ? 0 : dots.length - 1];
		ctx.lineTo(xy2[0], xy2[1]);
		ctx.stroke();
		if (dots.length > 0) return window.requestAnimationFrame(drawLines);
	}
	// Dots
	function drawDots() {
		const x = Number(rand(3, canvas.width));
		const y = Number(rand(3, canvas.height));
		if (x > canvas.width || y > canvas.height) return drawDots();
		dots.push([x, y]);
		point(ctx, x, y);
		if (dots.length >= 200) {
			dots.sort((a, b) => b[0] > a[0]);
			dots.sort((a, b) => b[1] < a[1]);
			return window.requestAnimationFrame(drawLines);
		}
		window.requestAnimationFrame(drawDots);
	}
	window.requestAnimationFrame(drawDots);
});
