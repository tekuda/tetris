
var grid;

var duration=0;
var myVar=setInterval(updateTime,1000);

var rows=20;
var cols=10;
var r=26;
var frame=101;
var frame2=101;
var frameFromLastPress=[0,0,0,0];
var rightPressed=false;
var leftPressed=false;
var downPressed=false;
var rightFast=false;
var leftFast=false;
var downFast=false;
var speed=1;

var moveSound;
var minWidth=cols*r+1;
var startTime=false;

function updateTime() {
    if (!startTime){
        return;
    }
    if (grid.gameFinished){
        return;
    }
    duration++;
}

//function preload() {
    //moveSound=loadSound("move.mp3");
//}

function setup() {
    var canvas = createCanvas(cols*r+3+4*r,rows*r+1);
    console.log(width);
    console.log(height);
    // jumbo-canvas is a string
    canvas.parent('jumbo-canvas');
    resetEverything();
}

function keyPressed() {

        if (keyIsDown(UP_ARROW)){
          grid.piece.rotate();
          grid.show();
        }
        if (keyIsDown(90)){
          grid.piece.rotate();
          grid.show();
        }
}

function draw() {
  frame++;
  var i;
  for (i=0;i<4;i++){
    frameFromLastPress[i]++;
  }
  if (keyIsDown(32)){
      //grid.cellRightClicked(Math.floor(mouseX/(width/cols)),Math.floor(mouseY/(height/rows)));
      grid.update();
      grid.show();
      frame=0;
      frame2=0;
      rightPressed=false;
      leftPressed=false;
      downPressed=false;
      rightFast=false;
      leftFast=false;
      downFast=false;
      return;
  }

    if (keyIsDown(DOWN_ARROW)){
      if (frameFromLastPress[2]>12){
        frameFromLastPress[2]=0;
        downFast=downPressed;
        frame=0;
        grid.update();
      }
      else if (frameFromLastPress[2]>3){
        if (downFast){
          frameFromLastPress[2]=0;
          frame=0;
          grid.update();
        }
      }
    }else{
      downFast=false;
    }
    if (keyIsDown(LEFT_ARROW)){
      rightFast=false;
      if (frameFromLastPress[1]>12){
        frameFromLastPress[1]=0;
        leftFast=leftPressed;
        grid.piece.moveLeft();
      }else if (frameFromLastPress[1]>3){
        if (leftFast){
          frameFromLastPress[1]=0;
          grid.piece.moveLeft();
        }
      }
    }else{
      leftFast=false;
    }
    if (keyIsDown(RIGHT_ARROW)){
      leftFast=false;
      if (frameFromLastPress[3]>12){
        frameFromLastPress[3]=0;
        rightFast=rightPressed;
        grid.piece.moveRight();
      }else if (frameFromLastPress[3]>3){
        if (rightFast){
          frameFromLastPress[3]=0;
          grid.piece.moveRight();
        }
      }
    }else{
      rightFast=false;
    }
    grid.show();

    downPressed=keyIsDown(DOWN_ARROW);
    leftPressed=keyIsDown(LEFT_ARROW);
    rightPressed=keyIsDown(RIGHT_ARROW);

    if (frame>50/speed){
        frame=0;
        grid.update();
        grid.show();
    }
}


function draw_bak() {
  if (keyIsDown(32)){
      //grid.cellRightClicked(Math.floor(mouseX/(width/cols)),Math.floor(mouseY/(height/rows)));
      grid.update();
      grid.show();
      frame=0;
      frame2=0;
      rightPressed=false;
      leftPressed=false;
      downPressed=false;
      rightFast=false;
      leftFast=false;
      downFast=false;
  }
    frame++;
    frame2++;
    if (!keyIsDown(DOWN_ARROW)){
      downFast=false;
    }
    if (!keyIsDown(LEFT_ARROW)){
      leftFast=false;
    }
    if (!keyIsDown(RIGHT_ARROW)){
      rightFast=false;
    }


    if (frame2>12){
      frame2=0;
      if (keyIsDown(DOWN_ARROW)){
        downFast=downPressed;
        frame=0;
        grid.update();
      }
      if (keyIsDown(LEFT_ARROW)){
        leftFast=leftPressed;
        grid.piece.moveLeft();
      }
      if (keyIsDown(RIGHT_ARROW)){
        rightFast=rightPressed;
        grid.piece.moveRight();
      }
    }else{
      if (keyIsDown(LEFT_ARROW)&!leftPressed){
        frame2=0;
        grid.piece.moveLeft();
      }
      if (keyIsDown(RIGHT_ARROW)&!rightPressed){
        frame2=0;
        grid.piece.moveRight();
      }
    }
    grid.show();

    if (frame2>3){
        if (downFast){
          frame=0;
          frame2=0;
          grid.update();
        }
        if (leftFast){
          frame2=0;
          grid.piece.moveLeft();
        }
        if (rightFast){
          frame2=0;
          grid.piece.moveRight();
        }
        grid.show();
    }

    downPressed=keyIsDown(DOWN_ARROW);
    leftPressed=keyIsDown(LEFT_ARROW);
    rightPressed=keyIsDown(RIGHT_ARROW);

    if (frame>50/speed){
        frame=0;
        grid.update();
        grid.show();
    }
}


function resetEverything(){
    grid=new Grid(cols,rows,r);
    grid.createNextPiece();
    grid.createPiece();
    startTime=true;
    duration=0;
}
