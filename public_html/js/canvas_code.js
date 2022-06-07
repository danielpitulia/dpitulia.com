document.getElementById("myCanvas").setAttribute("width", window.innerWidth + "px"); 

function draw(x,y) {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.clearRect(0,0,window.innerWidth,100);
	
	//Draw circle
	var img = document.getElementById("plane");
	
  	ctx.drawImage(img, x, y, 300,100);

	
	
	

	/*ctx.fillStyle = 'red';
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x,y+20,5,0,2*Math.PI);*/
	
	ctx.restore();
	x+=5;
	var loopTimer = setTimeout('draw('+x+','+y+')',20);
}

draw(0,0);