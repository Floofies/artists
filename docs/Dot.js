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
	ctx.lineWidth = 0;
	ctx.fillStyle = colors[rand(colors.length - 1)];
	ctx.strokeStyle = "White";
	// Points
	function point(ctx, x, y) {
		//ctx.beginPath();
		ctx.ellipse(x, y, 1, 1, 0, 0, 1);
		ctx.stroke();
	}
	// Known Dots
	var dots = [];
	const color = colors[rand(colors.length - 1)];
	// Lines
	function drawLines() {
		ctx.lineWidth = 8;
		const xy1 = dots.pop();
		//ctx.beginPath();
		ctx.strokeStyle = color;
		if (dots.length === 0) return ctx.stroke();
		ctx.moveTo(xy1[0], xy1[1]);
		const xy2 = dots[dots.length === 1 ? 0 : dots.length - 1];
		//ctx.lineTo(xy2[0], xy2[1]);
		ctx.bezierCurveTo(xy1[0], xy1[1], xy1[0] + 45, xy1[1] + 25, xy2[0], xy2[1]);
		ctx.stroke();
		if (dots.length > 0) return window.requestAnimationFrame(drawLines);
	}
	// Dots
	function drawDots() {
		const x = Number(rand(canvas.width));
		const y = Number(rand(canvas.height));
		if (x > canvas.width || y > canvas.height) return drawDots();
		dots.push([x, y]);
		point(ctx, x, y);
		if (dots.length >= 50) {
			const dots1 = dots.slice(0, dots.length / 4);
			const dots2 = dots.slice(dots.length / 4, (dots.length / 2) * 2);
			const dots3 = dots.slice(dots.length / 2, (dots.length / 4) * 2);
			const dots4 = dots.slice((dots.length / 4) * 3);
			dots1.sort((a,b) => (b[1] + a[0]) - (a[1] + b[0]));
			dots2.sort((a,b) => (b[0] + b[1]) - (a[0] + a[1]));
			dots3.sort((a,b) => (b[0] + a[0]) - (a[0] + b[1]));
			dots4.sort((a,b) => b[0] - a[0]);
			dots = dots1.concat(dots2, dots3, dots4);
			ctx.fill();
			ctx.beginPath();
			return window.requestAnimationFrame(drawLines);
		}
		//ctx.fill();
		window.requestAnimationFrame(drawDots);
	}
	window.requestAnimationFrame(drawDots);
});
