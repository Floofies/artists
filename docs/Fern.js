window.addEventListener("load", function () {
	const canvas = document.querySelector("#glcanvas");
	canvas.height = document.body.clientHeight;
	canvas.width = document.body.clientWidth;
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	function rand(maxInt = 9) {
		return Math.floor(Math.random() * (maxInt + 1));
	}
	const colors = [
		"AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure",
		"Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood",
		"CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan",
		"DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen",
		"Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey",
		"DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue",
		"FireBrick", "FloralWhite", "ForestGreen", "Fuchsia",
		"Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow",
		"HoneyDew", "HotPink",
		"IndianRed", "Indigo", "Ivory",
		"Khaki",
		"Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow",
		"LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray",
		"LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen",
		"Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue",
		"MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
		"NavajoWhite", "Navy",
		"OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid",
		"PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "PowderBlue", "Purple",
		"Red", "RosyBrown", "RoyalBlue",
		"SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey",
		"Snow", "SpringGreen", "SteelBlue",
		"Tan", "Teal", "Thistle", "Tomato", "Turquoise",
		"Violet",
		"Wheat", "WhiteSmoke",
		"Yellow", "YellowGreen"
	];
	function makeGradient(color1, color2, x0, y0, x1, y1) {
		const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);
		return gradient;
	}
	function randGradient() {
		const colorIndex1 = rand(colors.length - 1);
		const colorIndex2 = colorIndex1 === colors.length - 1 ? colorIndex1 - 1 : colorIndex1 === 0 ? 1 : colorIndex1 + 1;
		return makeGradient(colors[colorIndex1], colors[colorIndex2], 0, canvas.width, canvas.height, 0);
	}
	ctx.fillStyle = randGradient();
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	function point(ctx, x, y) {
		ctx.ellipse(x, y, 1, 1, 0, 0, 1);
		ctx.stroke();
	}
	function randXY() {
		const x = Number(rand(canvas.width - 200));
		const y = Number(rand(canvas.height - 200));
		if (x > canvas.width || y > canvas.height || x < 200 || y < 200) return randXY();
		return [x, y];
	}
	const colors2 = [
		colors[rand(colors.length - 1)],
		colors[rand(colors.length - 1)],
		colors[rand(colors.length - 1)]
	];
	var count = 0;
	function draw() {
		ctx.beginPath();
		const xy1 = randXY();
		const xy2 = randXY();
		count++;
		//ctx.lineWidth = rand(14);
		ctx.lineWidth = 1;
		const colorIndex1 = rand(colors2.length - 1);
		ctx.strokeStyle = colors2[colorIndex1];
		ctx.beginPath();
		ctx.moveTo(xy1[0], xy1[1]);
		point(ctx, xy1[0], xy1[1]);
		ctx.bezierCurveTo(xy1[0], xy2[0], xy2[1], xy2[1], xy1[0], xy1[1]);
		ctx.lineTo(xy1[0], xy1[1]);
		const colorIndex2 = colorIndex1 === colors2.length - 1 ? colorIndex1 - 1 : colorIndex1 === 0 ? 1 : colorIndex1 + 1;
		ctx.fillStyle = makeGradient(colors2[colorIndex1], colors2[colorIndex2], xy1[0], xy2[0], xy2[1], xy2[1]);
		ctx.fill();
		ctx.stroke();
		if (count <= 100) return window.requestAnimationFrame(draw);
	}
	window.requestAnimationFrame(draw);
});