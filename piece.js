function Piece(x,y,r){
    this.x=x;
    this.y=y;
    this.rotation=0;
    this.r=r;
    this.stop=false;
    this.blocks=[];
    this.colour;
}

Piece.prototype.rotate = function(){

};

Piece.prototype.update=function(){
    for (var i=0;i<this.blocks.length;i++){
        if ((this.blocks[i].y+1)===rows){
            this.stop=true;
        }else if (grid.cells[this.blocks[i].x][this.blocks[i].y+1].hasBlock){
            this.stop=true;
        }
    }
    if (this.stop){
        for (var i=0;i<this.blocks.length;i++){
            grid.cells[this.blocks[i].x][this.blocks[i].y].hasBlock=true;
            grid.cells[this.blocks[i].x][this.blocks[i].y].colour=this.colour;

        }
    }else{
        for (var i=0;i<this.blocks.length;i++){
            this.blocks[i].y+=1;
        }
        this.y+=1;
    }
}

Piece.prototype.moveRight=function(){
    for (var i=0;i<this.blocks.length;i++){
        if ((this.blocks[i].x+1)===cols){
            return;
        }else if (grid.cells[this.blocks[i].x+1][this.blocks[i].y].hasBlock){
            return;
        }
    }
    for (var i=0;i<this.blocks.length;i++){
        this.blocks[i].x+=1;
    }
    this.x+=1;
}

Piece.prototype.moveLeft=function(){
    for (var i=0;i<this.blocks.length;i++){
        if ((this.blocks[i].x-1)<0){
            return;
        }else if (grid.cells[this.blocks[i].x-1][this.blocks[i].y].hasBlock){
            return;
        }
    }
    for (var i=0;i<this.blocks.length;i++){
        this.blocks[i].x-=1;
    }
    this.x-=1;
}

Piece.prototype.show=function(){
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].show(this.colour);
    }
}

Piece.prototype.showNextPiece=function(offset){
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].showNextBlock(offset,this.colour);
    }
}

Piece.prototype.checkBlocks=function(){
    for (var i=0;i<this.blocks.length;i++){
        if (grid.cells[this.blocks[i].x+1][this.blocks[i].y].hasBlock){
            grid.finishGame();
        }
    }
}


function LPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.rotation=0;
    this.r=r;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y+1,this.r));
    this.blocks.push(new Block(this.x+1,this.y+1,this.r));
    this.colour=color('rgb(200,0,0)');
}

LPiece.prototype = new Piece();

LPiece.prototype.rotate=function(){
    var tempRotation=this.rotation+PI/2;
    tempRotation=tempRotation%(2*PI);
//    this.rotation+=PI/2;
    //this.rotation=this.rotation%(2*PI);
    if (tempRotation===0){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x][this.y+1].hasBlock){
                    if(!grid.cells[this.x+1][this.y+1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.blocks.push(new Block(this.x+1,this.y+1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI/2){
        if(!grid.cells[this.x-1][this.y].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x+1][this.y].hasBlock){
                    if(!grid.cells[this.x-1][this.y+1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.blocks.push(new Block(this.x-1,this.y+1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }

    } else if (tempRotation===PI){
        if(!grid.cells[this.x-1][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y-1].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x][this.y+1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-1,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    }else{
        if(!grid.cells[this.x+1][this.y-1].hasBlock){
            if(!grid.cells[this.x-1][this.y].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x+1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x+1,this.y-1,this.r));
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    }
}



function JPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.rotation=0;
    this.r=r;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y+1,this.r));
    this.blocks.push(new Block(this.x-1,this.y+1,this.r));
    this.colour=color('rgb(0,0,200)');
}

JPiece.prototype = new Piece();

JPiece.prototype.rotate=function(){
    var tempRotation=this.rotation+PI/2;
    tempRotation=tempRotation%(2*PI);
    if (tempRotation===0){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x][this.y+1].hasBlock){
                    if(!grid.cells[this.x-1][this.y+1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.blocks.push(new Block(this.x-1,this.y+1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI/2){
        if(!grid.cells[this.x-1][this.y].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x+1][this.y].hasBlock){
                    if(!grid.cells[this.x-1][this.y-1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.blocks.push(new Block(this.x-1,this.y-1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }

    } else if (tempRotation===PI){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x][this.y+1].hasBlock){
                    if(!grid.cells[this.x+1][this.y-1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.blocks.push(new Block(this.x+1,this.y-1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    }else{
        if(!grid.cells[this.x+1][this.y+1].hasBlock){
            if(!grid.cells[this.x-1][this.y].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x+1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x+1,this.y+1,this.r));
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    }
}

function SquarePiece(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x-1,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.blocks.push(new Block(this.x-1,this.y-1,this.r));
    this.colour=color('rgb(200,200,200)');
}

SquarePiece.prototype = new Piece();

function PlusPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x-1,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x+1,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.blocks.push(new Block(this.x,this.y+1,this.r));
    this.colour=color('rgb(200,0,200)');
}

PlusPiece.prototype = new Piece();




function SPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.rotation=0;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.blocks.push(new Block(this.x+1,this.y-1,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x-1,this.y,this.r));
    this.colour=color('rgb(200,100,0)');
}

SPiece.prototype = new Piece();

SPiece.prototype.rotate=function(){
    var tempRotation=this.rotation+PI/2;
    tempRotation=tempRotation%(PI);
    if (tempRotation===0){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x+1][this.y-1].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x-1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x+1,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI/2){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x+1][this.y-1].hasBlock){
                if(!grid.cells[this.x][this.y-2].hasBlock){
                    if(!grid.cells[this.x+1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x+1,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y-2,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }

    }
}

function ZPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.rotation=0;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x-1,this.y-1,this.r));
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x+1,this.y,this.r));
    this.colour=color('rgb(0,100,200)');
}

ZPiece.prototype = new Piece();

ZPiece.prototype.rotate=function(){
    var tempRotation=this.rotation+PI/2;
    tempRotation=tempRotation%(PI);
    if (tempRotation===0){
        if(!grid.cells[this.x-1][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y-1].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x+1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-1,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI/2){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y-2].hasBlock){
                if(!grid.cells[this.x-1][this.y-1].hasBlock){
                    if(!grid.cells[this.x-1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y-2,this.r));
                        this.blocks.push(new Block(this.x-1,this.y-1,this.r));
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }

    }
}


function IPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.rotation=0;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x-2,this.y,this.r));
    this.blocks.push(new Block(this.x-1,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x+1,this.y,this.r));
    this.colour=color('rgb(0,200,0)');
}

IPiece.prototype = new Piece();

IPiece.prototype.rotate=function(){
    var tempRotation=this.rotation+PI/2;
    tempRotation=tempRotation%(PI);
    if (tempRotation===0){
        if(!grid.cells[this.x-2][this.y].hasBlock){
            if(!grid.cells[this.x-1][this.y].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x+1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-2,this.y,this.r));
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI/2){
        if(!grid.cells[this.x][this.y-2].hasBlock){
            if(!grid.cells[this.x][this.y-1].hasBlock){
                if(!grid.cells[this.x][this.y].hasBlock){
                    if(!grid.cells[this.x][this.y+1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-2,this.r));
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }

    }
}

function TPiece(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.rotation=0;
    this.stop=false;
    this.blocks=[];
    this.blocks.push(new Block(this.x-1,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y,this.r));
    this.blocks.push(new Block(this.x+1,this.y,this.r));
    this.blocks.push(new Block(this.x,this.y-1,this.r));
    this.colour=color('rgb(200,100,0)');
}

TPiece.prototype = new Piece();

TPiece.prototype.rotate=function(){
    var tempRotation=this.rotation+PI/2;
    tempRotation=tempRotation%(2*PI);
    if (tempRotation===0){
        if(!grid.cells[this.x-1][this.y].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x+1][this.y].hasBlock){
                    if(!grid.cells[this.x][this.y-1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI/2){
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x][this.y+1].hasBlock){
                    if(!grid.cells[this.x+1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else if (tempRotation===PI){
        if(!grid.cells[this.x-1][this.y].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x+1][this.y].hasBlock){
                    if(!grid.cells[this.x][this.y+1].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x+1,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    } else {
        if(!grid.cells[this.x][this.y-1].hasBlock){
            if(!grid.cells[this.x][this.y].hasBlock){
                if(!grid.cells[this.x][this.y+1].hasBlock){
                    if(!grid.cells[this.x-1][this.y].hasBlock){
                        this.blocks.splice(0,4);
                        this.blocks.push(new Block(this.x,this.y-1,this.r));
                        this.blocks.push(new Block(this.x,this.y,this.r));
                        this.blocks.push(new Block(this.x,this.y+1,this.r));
                        this.blocks.push(new Block(this.x-1,this.y,this.r));
                        this.rotation=tempRotation;
                    }
                }
            }
        }
    }
}






function Block(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
;

    this.show=function(colour){
      if(this.gameFinished){
          return;
      }
        push();
        fill(colour);
        stroke(0);
        rectMode(CENTER);
        //console.log(this.r);
        rect(this.x*this.r+this.r/2,this.y*this.r+this.r/2,this.r-1,this.r-1);
        pop();
    }

    this.showNextBlock=function(offset,colour){
        push();
        fill(colour);
        stroke(0);
        rectMode(CENTER);

        var xx=(cols*this.r+2*this.r)+(this.x-5)*this.r/2;
        var yy=offset*this.r+((this.y-1)*this.r/2);

        rect(xx,yy,this.r/2,this.r/2);
        pop();
    }


}
