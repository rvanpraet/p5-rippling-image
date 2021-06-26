let img;
let imgWidth;
let imgHeight;
let images;
let cnv;
let coef;
let factor;
let drawFn = new Array(5);
let drawTimes;

function preload() {
	img1 = loadImage('assets/face2.jpg');
	img2 = loadImage('assets/distortions1.jpg');
	img3 = loadImage('assets/distortions2.jpg');
}

function setup() {
	// Images setup
	images = [img1, img2, img3];
	img = images[0];
	imgWidth = round(img.width);
	imgHeight = round(img.height);
	// img.resize(imgWidth, imgHeight);

	// Informative logs
	console.log('imgWidth ::: ', imgWidth);
	console.log('imgHeight ::: ', imgHeight);
	console.log('resolution ::: ', imgWidth * imgHeight);

	// Create canvas
	cnv = createCanvas(imgWidth * 2, imgHeight * 2, WEBGL);
	cnv.position(-width / 3, -height / 2.25);

	// Draw functions
	drawTimes = 0;
	drawFn = [drawEllipse, drawRect, drawTriangle];
	coef = 2;
}

function keyPressed() {
	if (keyCode === 71) {
		redraw();
	}
}

function draw() {
	background(0);
	// if (drawTimes === 25) {
	// 	noLoop();
	// }
	noLoop();
	let xOff = 0;
	for (let col = 0; col < imgWidth; col += coef) {
		let yOff = 0;
		for (let row = 0; row < imgHeight; row += coef) {
			// Pixel position
			let xPos = col + round(random(-2, 2));
			let yPos = row + round(random(-2, 2));

			// Size Factor
			factor = abs(round(sin(xPos) * cos(yPos) * random(coef * 3)));

			// Image/DrawFn index
			let i = abs(round(random(0, 2) + random(-1, 0)));
			// let i = round(random(0, 2));

			// Get color from random image
			let image = images[i];
			let c = image.get(xPos, yPos);

			// Add some hints to color
			let colorRandom = 5;
			c[0] = c[0] + round(random(-colorRandom, colorRandom));
			c[1] = c[1] + round(random(-colorRandom, colorRandom));
			c[2] = c[2] + round(random(-colorRandom, colorRandom));

			let index = round(random(0, 2));
			let handler = drawFn[index];

			// if ((xPos * yPos) % 3 !== 0) {
			// 	handler(xPos, yPos, c);
			// }
			handler(xPos, yPos, c);

			yOff += coef;
		}
		xOff += coef;
	}
	drawTimes++;
}

function drawRect(xPos, yPos, c) {
	let v = p5.Vector.fromAngles(sin(xPos) * random(100), cos(yPos) * random(50), 10); //Vector to translate the ellipse

	push();

	/* Move */
	translate(v);
	rotateX(radians(random(TWO_PI)));
	rotateY(radians(random(TWO_PI)));
	rotateZ(radians(random(TWO_PI)));

	// Fill
	c[3] = random(220, 255);
	if ((xPos * yPos) % 31 === 0) {
		fill(c);
	} else {
		noFill();
	}
	// Stroke
	strokeWeight(random(2));
	stroke(c);

	// Rect
	let x = xPos + random(-2, 2);
	let y = yPos + random(-2, 2);

	// Idea to map width/height
	// let w = map(xPos, 0, width, random(coef), random(coef * 4));
	// let h = map(yPos, 0, height, random(coef), random(coef * 4));
	rect(x, y, random(coef, coef * factor), random(coef, coef * factor));
	pop();
}

function drawEllipse(xPos, yPos, c) {
	// Setup
	let v = p5.Vector.fromAngles(sin(xPos) * random(100), cos(yPos) * random(50), 10); //Vector to translate the ellipse
	let r = random(coef + abs(sin(xPos) * factor));
	// let r = random(coef, coef * factor);

	push();

	// Move around
	translate(v);
	rotateX(radians(random(TWO_PI)));
	rotateY(radians(random(TWO_PI)));
	rotateZ(radians(random(TWO_PI)));

	// Fill
	c[3] = random(220, 255); // randomizes the alpha a bit
	noFill();

	// Stroke
	c[3] = abs(sin(xPos) * cos(yPos)) * random(170, 255); // randomizes the alpha a bit
	// strokeWeight(random(coef + abs(sin(xPos) * factor)));
	strokeWeight(random(coef * factor));
	stroke(c);

	// Ellipse
	ellipse(xPos + random(2), yPos + random(2), r * sin(xPos) * random(3), r * cos(yPos) * random(3));

	pop();
}

function drawTriangle(xPos, yPos, c) {
	let v = p5.Vector.fromAngles(sin(xPos) * random(100), cos(yPos) * random(50), 10); //Vector to translate the ellipse

	push();

	/* Move */
	translate(v);
	rotateX(radians(random(TWO_PI)));
	rotateY(radians(random(TWO_PI)));
	rotateZ(radians(random(TWO_PI)));

	// Colors, fill and stroke
	c[3] = random(220, 255);
	// fill(c);
	noFill();

	strokeWeight(random(coef));
	stroke(c);

	// Rect
	let mult = coef * factor;
	let x1 = xPos + random(-2, 2);
	let y1 = yPos + random(-2, 2);
	let x2 = x1 + round(random(-mult, mult));
	let y2 = y1 + round(random(-mult, mult));
	let x3 = x1 + round(random(-mult, mult));
	let y3 = y1 + round(random(-mult, mult));
	triangle(x1, y1, x2, y2, x3, y3);

	pop();
}

function drawBrezier(xPos, yPos, c) {
	let t = millis() / 1000;
	let v = p5.Vector.fromAngles(t * 1.5, t * 1.7, 100); //Vector to translate the ellipse

	push();

	translate(xPos, yPos, random(-300, 300));
	rotate(radians(random(360)));

	noFill();

	c[3] = abs(sin(xPos) * cos(yPos)) * random(100, 255);
	strokeWeight(random(coef * 0.66, coef * 1.33));
	stroke(color(c));

	curve(
		xPos,
		yPos,
		sin(xPos) * random(60),
		cos(xPos) * sin(xPos) * random(60),
		random(10),
		random(80),
		cos(yPos) * sin(yPos) * random(75),
		sin(xPos) * cos(xPos) * 50
	);
	pop();
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(arr) {
	let j, x, index;
	for (index = arr.length - 1; index > 0; index--) {
		j = Math.floor(Math.random() * (index + 1));
		x = arr[index];
		arr[index] = arr[j];
		arr[j] = x;
	}
	return arr;
}
