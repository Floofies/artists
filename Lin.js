window.addEventListener("load", function () {
	const canvas = document.querySelector("#glcanvas");
	canvas.height = document.height;
	canvas.widfth = document.width;
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	function rand(maxLength = 0, maxInt = 9) {
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

	// Points
	function point(ctx, x, y) {
		ctx.rect(x, y, 4, 4);
		ctx.stroke();
	}
	// Noise
	function noise() {
		do {
			const x = Number(rand(3, canvas.width));
			const y = Number(rand(3, canvas.height));
			if (x > canvas.width || y > canvas.height) continue;
			point(ctx, x, y);
		} while (false);
		window.requestAnimationFrame(noise);
	}
	//window.requestAnimationFrame(noise);
	// Wandering Line
	function wanderLine(wx, wy, color = colors[rand(1, colors.length - 1)]) {
		var face = 0;
		function getFace() {
			var newFace = rand(1, 3);
			if (newFace === 0 && face === 2) return getFace();
			if (newFace === 1 && face === 3) return getFace();
			if (newFace === 2 && face === 0) return getFace();
			if (newFace === 3 && face === 1) return getFace();
			if (face === 0 && newFace === 2) return getFace();
			if (face === 1 && newFace === 3) return getFace();
			if (face === 2 && newFace === 0) return getFace();
			if (face === 3 && newFace === 1) return getFace();
			face = newFace;
			return face;
		}
		function* wanderGen() {
			const face = getFace();
			const length = rand(2, 10);
			for (var total = 0; total < length; total++) {
				//ctx.strokeStyle = colors[rand(1, 145)];
				ctx.beginPath();
				if (face === 0) wy++;
				else if (face === 1) wx++;
				else if (face === 2) wy--;
				else if (face === 3) wx--;
				if (wx < 0) wx = wx + canvas.width;
				if (wy < 0) wy = wy + canvas.height;
				if (wx > canvas.width) wx = wx - canvas.width;
				if (wy > canvas.height) wy = wy - canvas.height;
				point(ctx, wx, wy);
				yield;
			}
		}
		var wanderIter = wanderGen();
		function wander() {
			ctx.beginPath();
			ctx.strokeStyle = color;
			var state = wanderIter.next();
			if (state.done) wanderIter = wanderGen();
			window.requestAnimationFrame(wander);
		}
		window.requestAnimationFrame(wander);
	}
	for (var x = 100; x < canvas.width; x += 100) {
		for (var y = 100; y < canvas.height; y += 100) {
			wanderLine(x, y);
		}
	}
});
