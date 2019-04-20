var players = [];
var balls = [];
var score_1 = 0;
var score_2 = 0;
var frame;

var dist;

var ai_p1;
var ai_p2;

var ball_y;
var ball_x;
var ball_speed;

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
        if (check(i,u) == true) {
          console.log("BOING");
          balls[i].hit(players[u].y,players[u].h);
          console.log("Speed",balls[i].speed);
        }
      }

      //AI CODE

      if(ai_p1){
        ai(0);
      }
      if(ai_p2){
        ai(1);
      }

      //END AI CODE

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
    if (ai_p1) {
      text("AI: ON", 50,50);
    }
    else {
      text("AI: OFF", 50,50);
    }
    if (ai_p2) {
      text("AI: ON", width-50,50);
    }
    else {
      text("AI: OFF", width-50,50);
    }
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
    text("*but it keeps getting more stressfull",width/2,height/2 + 20);
    fill(255);
    textSize(40);
    text("Press any key to start",width/2,height/2 + 80);
    fill(170);
    textSize(12);
    text("Player 1 uses W and S to move",width/2,height/2 + 140);
    text("Player 2 uses UP arrow and DOWN arrow to move",width/2,height/2 + 160);
    text("Press 1 to toggle AI for player 1",width/2,height/2 + 180);
    text("Press 2 to toggle AI for player 2",width/2,height/2 + 200);
  }
}

function keyPressed(){
  start = true;
  if (key == "1") {
    if (ai_p1) {
      ai_p1 = false;
    }
    else {
      ai_p1 = true;
    }
  }
  else if (key == "2") {
    if (ai_p2) {
      ai_p2 = false;
    }
    else {
      ai_p2 = true;
    }
  }
}

function ai(p){
  if (balls.length == 1 && p == 0){
    dist = balls[0].x - players[p].x;
  }
  else if (balls.length == 1 && p == 1) {
    dist = width - balls[0].x - players[p].x;
  }
  ball_y = balls[0].y;
  ball_x = balls[0].x;
  ball_speed = balls[0].speedY;
  while(true){
    ball_y += ball_speed;
    if (ball_y > height || ball_y < 0){
      ball_speed = -ball_speed;
    }
    ball_x += balls[0].speedX;
    if (ball_x - players[p].w/2 < 0 || ball_x + players[p].w/2 > width) {
      break
    }
  }
  if (players[p].y > ball_y){
    players[p].move_up();
  }
  else if (players[p].y < ball_y) {
    players[p].move_down();
  }
}

function addBall(){
  if((score_1 + score_2) > 0 && (score_1 + score_2)%5 == 0 && balls.length <= 10){
    balls.push(new Ball(width/2,random(0,height),random(-HALF_PI,HALF_PI)*7/10));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
  players[1].x = width - 20;
}

function check(i,u){
  if(u == 0){
    if((balls[i].x - balls[i].d/2) < (players[u].x + players[u].w/2) && balls[i].y < (players[u].y + players[u].h/2) && balls[i].y > (players[u].y - players[u].h/2)){
      return true;
    }
    else {
      return false;
    }
  }
  else {
    if((balls[i].x + balls[i].d/2) > (players[u].x - players[u].w/2) && balls[i].y < (players[u].y + players[u].h/2) && balls[i].y > (players[u].y - players[u].h/2)){
      return true;
    }
    else {
      return false;
    }
  }
}
