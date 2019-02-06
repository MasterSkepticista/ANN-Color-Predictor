let r, g, b;
let nn;
let predict;
let inputs = [];
let targets = [];
let ans = "BLACK";

function pickColor(){
	r = random(255);
	g = random(255);
	b = random(255);

}
function setup(){
	createCanvas(600, 400);
	nn = new NeuralNetwork(3,8,2);
	pickColor();

}
function mousePressed(){
	pickColor();
	ans = colorPredict();
	let color = [r/255, g/255, b/255];
		if(mouseX < width/2){
			targets.push([1,0]);

		}else{
			targets.push([0,1]);

		}
		inputs.push(color);




}
function colorPredict(){
	let color = [r/255, g/255, b/255];

	predict = nn.predict(color);
	console.log(predict);
	if(predict[0]>0.8){
		return "BLACK";
	}else if(predict[1]>0.8){
		return "WHITE";
	}



}
function draw(){
	background(r, g, b);
	fill(0);
	textSize(64);
	textAlign(CENTER, CENTER);
	text("black", 150, height/2);

	fill(255);
	noStroke();
	text("white", 450, height/2);
	strokeWeight(3);
	stroke(0);
	line(width/2, 0, width/2, height);


	if(ans === "BLACK"){
		fill(0);
		noStroke();
		ellipse(150, 300, 32, 32);
	}else{
		fill(255);
		noStroke();
		ellipse(450, 300, 32, 32);
	}

	for(let i=0;i<inputs.length;i++){
		for(let j=0;j<5;j++)
		nn.train(inputs[i], targets[i]);
	}

}
