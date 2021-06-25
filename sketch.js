let img;
let imgWidth;
let imgHeight;
let cnv;
let angle = 0;

function preload() {
	img = loadImage('assets/standing.meditation.jpg');
}

function setup() {
	imgWidth = round(img.width / 6);
	imgHeight = round(img.height / 6);
	img.resize(imgWidth, imgHeight);
	cnv = createCanvas(imgWidth, imgHeight);
	let newCanvasX = (windowWidth - imgWidth) / 2;
	let newCanvasY = (windowHeight - imgHeight) / 2;

	cnv.position(newCanvasX, newCanvasY);
}

function draw() {
	let xOff = 0;
	for (let col = 0; col < imgWidth; col += 1) {
		let yOff = 0;
		for (let row = 0; row < imgHeight; row += 1) {
			let xPos = col + (sin(xOff) * xOff) / 40;
			let yPos = row + (cos(yOff) * yOff) / 40;
			let c = img.get(xPos, yPos);
			push();
			translate(xPos, yPos);
			// rotate(radians(angle));
			noFill();
			strokeWeight(random(1, 2));
			stroke(color(c));
			curve(
				xPos,
				yPos,
				sin(xPos) * random(3),
				cos(yPos) * random(5),
				sin(xPos) * random(5),
				cos(yPos) * random(3),
				cos(xPos) * sin(yPos) * 4,
				cos(yPos) * sin(xPos) * 4
			);
			pop();
			angle += 1;
			yOff++;
		}
		xOff++;
	}
	noLoop();
}
