//This file contains the code to update the unit circle drawn in the <canvas> element. 

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const radius = 75;

function drawBackground() {
	//Draws the static background of the canvas, e.g. title and circle

	//Draw x-axis
	ctx.moveTo(0, canvas.height / 2);
	ctx.lineTo(canvas.width, canvas.height / 2);
	ctx.stroke();
	ctx.closePath();

	//Draw y-axis
	ctx.beginPath()
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
	ctx.closePath();

	//Draw unit circle
	ctx.moveTo(canvas.width / 2, canvas.height / 2);
	ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();

	//Draw numbers and title
	ctx.fillStyle = "black";
	ctx.font = "20px serif";

	ctx.fillText("1", canvas.width / 2 + radius, canvas.height / 2 - 5);
	ctx.fillText("1", canvas.width / 2 + 5, canvas.height / 2 - radius - 10);
	ctx.fillText("-1", canvas.width / 2 + 5, canvas.height / 2 + radius + 20);
	ctx.fillText("-1", canvas.width / 2 - radius - 20, canvas.height / 2 - 5);
	ctx.fillText("x", canvas.width - 20, canvas.height / 2 - 10);
	ctx.fillText("y", canvas.width / 2 + 10, 20);

	function drawDots(x, y) {
		//Draws four dots on canvas, one in each quadrant. 
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2 + (Math.sqrt(x) / 2) * 75, canvas.height / 2 - (Math.sqrt(y) / 2 * 75));
		ctx.arc(canvas.width / 2 + (Math.sqrt(x) / 2) * 75, canvas.height / 2 - (Math.sqrt(y) / 2 * 75), 2, 0, 2 * Math.PI);

		ctx.moveTo(canvas.width / 2 + (Math.sqrt(x) / 2) * 75, canvas.height / 2 + (Math.sqrt(y) / 2 * 75));
		ctx.arc(canvas.width / 2 + (Math.sqrt(x) / 2) * 75, canvas.height / 2 + (Math.sqrt(y) / 2 * 75), 2, 0, 2 * Math.PI);

		ctx.moveTo(canvas.width / 2 - (Math.sqrt(x) / 2) * 75, canvas.height / 2 - (Math.sqrt(y) / 2 * 75));
		ctx.arc(canvas.width / 2 - (Math.sqrt(x) / 2) * 75, canvas.height / 2 - (Math.sqrt(y) / 2 * 75), 2, 0, 2 * Math.PI);

		ctx.moveTo(canvas.width / 2 - (Math.sqrt(x) / 2) * 75, canvas.height / 2 + (Math.sqrt(y) / 2 * 75));
		ctx.arc(canvas.width / 2 - (Math.sqrt(x) / 2) * 75, canvas.height / 2 + (Math.sqrt(y) / 2 * 75), 2, 0, 2 * Math.PI);

		ctx.stroke();
		ctx.closePath();
	}

	//Draw (sqrt(3)/2, 1/2), (sqrt(2)/2, sqrt(2)/2) and (1/2, sqrt(3)/2) in each quadrant. 
	drawDots(3, 1);
	drawDots(2, 2);
	drawDots(1, 3);

}

drawBackground();

function drawTriangle(c1, c2, angle) {
	//Draws the triangle animated in the unit circle with arguments c1 and c2

	ctx.beginPath();
	ctx.moveTo(c1, canvas.height / 2);
	ctx.lineTo(c1, c2);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, canvas.height / 2);
	ctx.lineTo(c1, c2)
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, canvas.height / 2);
	ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0 , angle, true);
	ctx.stroke();
	ctx.closePath();
}


//This last part is a work-around caused by the previous frame (or drawn path) still remaining in the canvas. 
ctx.beginPath();
ctx.closePath();


//Drawing for Desktop
canvas.addEventListener("mousemove", (e) => {
	//Get the location of the canvas element in the window. 
	let rect = canvas.getBoundingClientRect();

	//Get the mouse position
	let x = e.clientX - (rect.left);
	let y = e.clientY - (rect.top);

	let x_origo = x - canvas.width / 2;
	let y_origo = -y + canvas.height / 2;
	let angle_rad = Math.atan((y_origo) / (x_origo)) / Math.PI;
	let angle_deg = Math.round(angle_rad * 360 / (2));
	let cos_alpha = Math.cos(angle_rad * Math.PI).toFixed(2);
	let sin_alpha = Math.sin(angle_rad * Math.PI).toFixed(2);
	let cos_neg_alpha = Math.cos(-angle_rad * Math.PI).toFixed(2);
	let sin_neg_alpha = Math.sin(-angle_rad * Math.PI).toFixed(2);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBackground();

	//Draw triangle and update x, y and angle. There is a different code depending on the quadrant. 
	if (x_origo >= 0) {
		if (y_origo >= 0) {
			document.getElementById("position").innerHTML = `x = ${cos_alpha}, y = ${sin_alpha} and angle = ${angle_deg}° / ${angle_rad.toFixed(2)} π rad`;
			drawTriangle(canvas.width / 2 + cos_alpha * 75, -sin_alpha * 75 + 200, -angle_rad * Math.PI);
		} else {
			document.getElementById("position").innerHTML = `x = ${cos_alpha}, y = ${sin_alpha} and angle = ${(360+angle_deg)}° / ${(2+angle_rad).toFixed(2)} π rad`;
			drawTriangle(canvas.width / 2 + cos_alpha * 75, -sin_alpha * 75 + 200, -Math.PI * (2 + angle_rad));
		}
	} else {
		document.getElementById("position").innerHTML = `x = ${-cos_neg_alpha}, y = ${sin_neg_alpha} and angle = ${(180+angle_deg)}° / ${(1+angle_rad).toFixed(2)} π rad`;
		drawTriangle(-cos_neg_alpha * 75 + canvas.width / 2, -sin_neg_alpha * 75 + 200, -Math.PI * (1 + angle_rad));
	}
});

//Same code as above but for touch devices. "e.clientX" is replaced by "e.touches[0].clientX"
canvas.addEventListener("touchmove", (e) => {
	let rect = canvas.getBoundingClientRect();

	let x = e.touches[0].clientX - (rect.left);
	let y = e.touches[0].clientY - (rect.top);

	let x_origo = x - canvas.width / 2;
	let y_origo = -y + canvas.height / 2;
	let angle_rad = Math.atan((y_origo) / (x_origo)) / Math.PI;
	let angle_deg = Math.round(angle_rad * 360 / (2));
	let cos_alpha = Math.cos(angle_rad * Math.PI).toFixed(2);
	let sin_alpha = Math.sin(angle_rad * Math.PI).toFixed(2);
	let cos_neg_alpha = Math.cos(-angle_rad * Math.PI).toFixed(2);
	let sin_neg_alpha = Math.sin(-angle_rad * Math.PI).toFixed(2);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBackground();

	//Draw triangle and update x, y and angle
	if (x_origo >= 0) {
		if (y_origo >= 0) {
			document.getElementById("position").innerHTML = `x = ${cos_alpha}, y = ${sin_alpha} and angle = ${angle_deg}° / ${angle_rad.toFixed(2)} π rad`;
			drawTriangle(canvas.width / 2 + cos_alpha * 75, -sin_alpha * 75 + 200, -angle_rad * Math.PI);
		} else {
			document.getElementById("position").innerHTML = `x = ${cos_alpha}, y = ${sin_alpha} and angle = ${(360+angle_deg)}° / ${(2+angle_rad).toFixed(2)} π rad`;
			drawTriangle(canvas.width / 2 + cos_alpha * 75, -sin_alpha * 75 + 200, -Math.PI * (2 + angle_rad));
		}
	} else {
		document.getElementById("position").innerHTML = `x = ${-cos_neg_alpha}, y = ${sin_neg_alpha} and angle = ${(180+angle_deg)}° / ${(1+angle_rad).toFixed(2)} π rad`;
		drawTriangle(-cos_neg_alpha * 75 + canvas.width / 2, -sin_neg_alpha * 75 + 200, -Math.PI * (1 + angle_rad));
	}
});