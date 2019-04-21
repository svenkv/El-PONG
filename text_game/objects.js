function Player(key_up,key_down,x,y){
  this.key_up = key_up;
  this.key_down = key_down;
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 100;
  this.speed = 14;
  this.move_up = function(){
    if ((this.y - this.speed) >= 0) {
      this.y -= this.speed
    }
  }
  this.move_down = function(){
    if ((this.y + this.speed) <= height) {
      this.y += this.speed
    }
  }
  this.draw = function(){
    rectMode(CENTER);
    fill(255);
    rect(this.x,this.y,this.w,this.h);
  }
}

function Ball(x,y,direction){
  this.x = x;
  this.y = y;
  this.direction = direction;
  if (random() > 0.5) {
    this.direction = -this.direction + PI;
  }
  this.d = 20;
  this.speed = 10;
  this.speedX = cos(this.direction)*this.speed;
  this.speedY = sin(this.direction)*this.speed;

  this.invert = function(){
    this.direction = -this.direction;
    this.speedX = cos(this.direction)*this.speed;
    this.speedY = sin(this.direction)*this.speed;
  }
  this.hit = function(pY,pH,s){
    angleMode(RADIANS);
    if (s){
      this.speed += 1;
    }
    this.direction = HALF_PI*7/10 * ((this.y - pY)/(pH/2));
    if(this.x > width/2){
      this.direction = -this.direction + PI;
    }
    this.speedX = cos(this.direction)*this.speed;
    this.speedY = sin(this.direction)*this.speed;
  }
  this.draw = function(){
    this.x += this.speedX;
    this.y += this.speedY;
    fill(255);
    circle(this.x,this.y,this.d);
  }
}
