function Grid(cols,rows,r){
    this.r=r;
    this.cols=cols;
    this.rows=rows;
    this.gameFinished=false;
    this.score=0;
    this.explodingLines=0;
//    document.getElementById('score').innerHTML = this.remainingMineCount;

    var buttonWidth=cols*r/2;
    var buttonWidthString=buttonWidth+"px";

    var newGameButtonWidthString=width+"px";

    document.getElementById('new-game').style.width=newGameButtonWidthString;

    this.piece=null;
    this.nextPiece=null;

    this.cells = new Array(this.cols);
    for (var i = 0; i < this.cols; i++) {
        this.cells[i] = new Array(this.rows);
    }

    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            this.cells[i][j]=new Cell(i,j,this.r);
        }
    }

    this.update=function(){
        if(this.gameFinished){
            return;
        }
        var explodingLines=0;
        for (var j = 0; j <this.rows; j++) {
            var deleteRow=true;
            for (var i = 0; i < this.cols; i++) {
                if (!this.cells[i][j].hasBlock){
                    deleteRow=false;
                }
            }
            if (deleteRow){
                explodingLines++;
                for (var k = j; k >0; k--) {
                    for (var i = 0; i < this.cols; i++) {
                        this.cells[i][k].hasBlock=this.cells[i][k-1].hasBlock;
                        this.cells[i][k].colour=this.cells[i][k-1].colour;
                    }
                }
                for (var i = 0; i < this.cols; i++) {
                    this.cells[i][0].hasBlock=false;
                    this.cells[i][0].colour=color('rgb(70,70,70)');
                }
            }
        }
        if (explodingLines===4){
            this.score+=1000;
        }else if (explodingLines===3){
            this.score+=600;
        }else if (explodingLines===2){
            this.score+=300;
        }else if (explodingLines===1){
            this.score+=100;
        }

        if (explodingLines>0){
            this.newLevel=false;
        }

        this.explodingLines+=explodingLines;

        if (this.piece!=null){
            if (this.piece.stop){
                this.createPiece();
            }else{
                this.piece.update();
            }
        }

        speed=Math.floor(this.explodingLines/10)+1;
    }

    this.show=function(){
        background(50);
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.cells[i][j].show();
            }
        }
        if (this.piece!=null){
            this.piece.show();
        }
        fill(200);
        var offset=1;
        textSize(2*this.r/3);
        textAlign(CENTER);
        text("Time", this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        var durationMins=Math.floor(duration/60);
        var durationSecs=duration%60;
        var timeString="";
        if (durationSecs<10){
            timeString=durationMins+":0"+durationSecs;
        }else{
            timeString=durationMins+":"+durationSecs;
        }
        text(timeString, this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        offset++;


        text("Score", this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        text(this.score, this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        offset++;

        text("Lines", this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        text(this.explodingLines, this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        offset++;


        text("Next", this.cols*this.r+this.r*2, offset*this.r);
        offset++;

        if (this.nextPiece!=null){
            this.nextPiece.showNextPiece(offset);
        }
        //console.log(this.cols*this.r+this.r*2);
        //console.log(offset);

        offset++;
        offset++;
        offset++;


        text("Level", this.cols*this.r+this.r*2, offset*this.r);
        offset++;
        text(speed, this.cols*this.r+this.r*2, offset*this.r);
        //moveSound.play();

    }

    this.createPiece=function(){

        if (this.nextPiece!=null){
            this.piece=this.nextPiece;
            this.piece.checkBlocks();
        }
        this.createNextPiece();
    }
    this.createNextPiece=function(){


        var k=random(7);
        if (k<1){
            this.nextPiece=new LPiece(5,1,this.r);
        }else if (k<2){
            this.nextPiece=new SquarePiece(5,1,this.r);
        }else if (k<3){
            this.nextPiece=new SPiece(5,1,this.r);
        }else if (k<4){
            this.nextPiece=new ZPiece(5,1,this.r);
        }else if (k<5){
            this.nextPiece=new JPiece(5,1,this.r);
        }else if (k<6){
            this.nextPiece=new TPiece(5,1,this.r);
        }else {
            this.nextPiece=new IPiece(5,0,this.r);
        }
    }
    this.createPiece1=function(){
            this.piece=new PlusPiece(5,1,this.r);
    }
    this.finishGame=function(){
        this.gameFinished=true;
    }
}


function Cell(x,y,r){
    this.x=x;
    this.y=y;
    this.count=0;
    this.r=r;
    this.hasBlock=false;
    this.colour=color('rgb(50,50,50)');


    this.show=function(){
        if(this.hasBlock){
            stroke(100);
            fill(this.colour);
        }else{
            stroke(100);
            fill(this.colour);
        }
        rectMode(CENTER);
        rect(this.x*this.r+this.r/2,this.y*this.r+this.r/2,this.r-2,this.r-2);

    }

}
