let img;
let imgWidth;
let imgHeight;
let images;
let cnv;
let coef;
let factor;
let drawFn = new Array(5);

function preload() {
	img = loadImage('assets/drift1.jpg');
	img2 = loadImage('assets/distortions1.jpg');
	img3 = loadImage('assets/face2.jpg');
}

function setup() {
	imgWidth = round(img.width);
	imgHeight = round(img.height);
	// img.resize(imgWidth, imgHeight);
	console.log('imgWidth ::: ', imgWidth);
	console.log('imgHeight ::: ', imgHeight);
	console.log('resolution ::: ', imgWidth * imgHeight);
	cnv = createCanvas(imgWidth * 2, imgHeight * 2, WEBGL);
	images = [img2, img3, img];
	drawFn = [drawEllipse, drawRect, drawBrezier];
	coef = 2;
	cnv.position(-width / 4, -height / 4);
	translate(-width / 2, 0);
}

function draw() {
	// background(0);
	// noLoop();
	let xOff = 0;
	for (let col = 0; col < imgWidth; col += coef) {
		let yOff = 0;
		for (let row = 0; row < imgHeight; row += coef) {
			// Pixel position
			let xPos = col + round(random(-2, 2));
			let yPos = row + round(random(-2, 2));

			// Size Factor
			factor = abs(sin(xPos) * cos(yPos) * random(2, 5));

			// Image/DrawFn index
			// let index = abs(round(random(0, 2) + random(-1, 0)));
			let i = round(random(0, 1));

			// Get color from random image
			let image = images[i];
			let c = image.get(xPos, yPos);

			// Add some hints to color
			let colorRandom = 5;
			c[0] = c[0] + round(random(-colorRandom, colorRandom));
			c[1] = c[1] + round(random(-colorRandom, colorRandom));
			c[2] = c[2] + round(random(-colorRandom, colorRandom));

			let index = round(random(0, 1));
			let handler = drawFn[index];

			if ((xPos * yPos) % 5 !== 0) {
				handler(xPos, yPos, c);
			}

			yOff += coef;
		}
		xOff += coef;
	}
}

function drawRect(xPos, yPos, c) {
	let t = millis() / 1000;
	let v = p5.Vector.fromAngles(t * 1.7, t * 1.5, 0); //Vector to translate the ellipse

	push();

	translate(v);
	// rotateY(radians(random(360)));
	// rotateX(radians(random(360)));
	// translate(0, 0, random(-500, 500));

	// rotate(radians(random(360)));

	// Colors, fill and stroke
	c[3] = random(220, 255);
	fill(c);

	strokeWeight(random(2));
	// c = shuffle(c);
	// c[3] = abs(sin(xPos) * cos(yPos)) * random(0, 180);
	stroke(c);

	// Rect
	let x = xPos + random(-2, 2);
	let y = yPos + random(-2, 2);
	if (xPos === 0) {
		xPos++;
	}
	if (yPos === 0) {
		yPos++;
	}
	let w = map(xPos, 0, width, random(coef), random(coef * 4));
	let h = map(yPos, 0, height, random(coef), random(coef * 4));
	rect(x, y, random(coef, coef * factor), random(coef, coef * factor));
	pop();
}

function drawEllipse(xPos, yPos, c) {
	// Setup
	let t = millis() / 1000;
	let v = p5.Vector.fromAngles(sin(xPos) * random(100), cos(yPos) * random(50), 10); //Vector to translate the ellipse
	let r = random(coef, coef * factor);

	push();
	translate(v);
	// rotateY(radians(random(360)));
	// rotateX(radians(random(360)));
	// translate(0, 0, random(-500, 500));

	// Color, fill, storke
	c[3] = random(220, 255);
	// fill(c);
	noFill();
	strokeWeight(random(coef * factor));
	c[3] = abs(sin(xPos) * cos(yPos)) * random(170, 255);
	stroke(c);
	// noStroke();
	// stroke(c);

	// Ellipse
	ellipse(xPos + random(2), yPos + random(2), r * sin(xPos) * random(3), r * cos(yPos) * random(3));
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
