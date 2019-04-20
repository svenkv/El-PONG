var players = [];
var balls = [];
var score_1 = 0;
var score_2 = 0;
var frame;

var start;

function setup() {
  createCanvas(windowWidth,windowHeight - 10);
  textAlign(CENTER);
  rectMode(CENTER);
  players.push(new Player(87,83,20,height/2));
  players.push(new Player(UP_ARROW,DOWN_ARROW,width - 20,height/2));
  balls.push(new Ball(width/2,random(0,height),random(-HALF_PI,HALF_PI)/2));
}

function draw() {
  if(start == true && focused){
    background(0)
    for(var i = 0; i < players.length; i++){
      if(keyIsDown(players[i].key_up)){
        players[i].move_up();
      }
      else if (keyIsDown(players[i].key_down)) {
        players[i].move_down();
      }
      players[i].draw();
    }
    for (var i = 0; i < balls.length; i++) {
      if (balls[i].y < 0 || balls[i].y > height) {
        balls[i].invert()
      }
      for (var u = 0; u < players.length; u++) {
        if ((players[u].x - players[u].w/2) <= balls[i].x && balls[i].x <= (players[u].x + players[u].w/2) && balls[i].y <= players[u].y + players[u].h/2 && balls[i].y >= players[u].y - players[u].h/2) {
          console.log("BOING");
          balls[i].hit(players[u].y,players[u].h);
          console.log("Speed",balls[i].speed);
        }
      }
      balls[i].draw();
      if(balls[i].x < 0){
        score_1 += 1;
        addBall();
        balls.splice(i,1);
        balls.push(new Ball(width/2,random(0,height),random(-HALF_PI,HALF_PI)*7/10));
      }
      if(balls[i].x > width){
        score_2 += 1;
        addBall();
        balls.splice(i,1);
        balls.push(new Ball(width/2,random(0,height),random(-HALF_PI,HALF_PI)*7/10));
      }
    }
    fill(255)
    textSize(30)
    text(score_1,width/2 + 50,40);
    text(score_2,width/2 - 50,40);
    textSize(12);
    text("Speeds:",width/2,20);
    for (var i = 0; i < balls.length; i++){
      text(balls[i].speed,width/2,40 + 20*i);
    }
    stroke(255);
    line(width/2,0,width/2,height);
  }
  else if (!focused && start == true) {
    background(0);
    fill(255);
    textSize(40);
    text("PAUSED",width/2,height/2);
  }
  else{
    background(0);
    fill(255);
    textSize(40);
    text("WELCOME TO:",width/2,height/2 - 60);
    textSize(60);
    text("PONG*",width/2,height/2);
    fill(170);
    textSize(12);
    text("*but it keeps getting more stressfull",width/2,height/2 + 20)
    fill(255);
    textSize(40);
    text("Press any key to start",width/2,height/2 + 80);
    fill(170);
    textSize(12);
    text("Player 1 uses W and S to move",width/2,height/2 + 140)
    text("Player 2 uses UP arrow and DOWN arrow to move",width/2,height/2 + 160)
  }
}

function keyPressed(){
  start = true;
}

function addBall(){
  if((score_1 + score_2) > 0 && (score_1 + score_2)%5 == 0 && balls.length <= 10){
    balls.push(new Ball(width/2,random(0,height),random(-HALF_PI,HALF_PI)*7/10));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
