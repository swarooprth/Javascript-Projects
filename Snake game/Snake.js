function init()
{
    canvas=document.getElementById("mycanvas");
    W=canvas.width=1000;
    H=canvas.height=550;
    pen=canvas.getContext("2d");
    game_over=false;
    cs=35;
    food_image = new Image();
    food_image.src="apple.png";
    score=0;
    trophy=new Image();
    trophy.src="trophy.png";
    speed=100;
    food=getRandomFood();
    snake={
        color:"violet",
        cells:[],
        init_length:5,
        direction:"right",
    
    mksnake:function()
    {
        for(var i=this.init_length;i>0;i--)
        {
            this.cells.push({x:i,y:0});

        }
    },
    drawsnake:function()
    {
        for(var i=0;i<this.cells.length;i++)
        {pen.fillStyle=this.color;
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
    },
    updatesnake:function()
    {
        
        var headx=this.cells[0].x;
        var heady=this.cells[0].y;
        if(food.x==headx&&food.y==heady)
        {console.log("Food eaten by snake");
            food=getRandomFood();
            score++;
            
        }
        else
        {
            this.cells.pop();
        }
        var X,Y;
        if(this.direction=="up")
        {
             X=headx;
             Y=heady-1;
            

        }
        else if(this.direction=="left")
        {
             X=headx-1;
             Y=heady;
            
        }
        else  if(this.direction=="down")
        {
            X=headx;
            Y=heady+1;
            

        }
        else
        {    
             X=headx+1;
             Y=heady;
            
        }

        var total_row_cell=Math.round(W/cs);
        var total_column_cell=Math.round(H/cs);

        if(X<0) X+=total_row_cell;
        else if(Y<0) Y+=total_column_cell;
        else if(X>=total_row_cell) X=0;
        else if(Y>=total_column_cell) Y=0;
        //         if(headx<0||heady<0||headx>total_row_cell||heady>total_column_cell)
        // game_over=true;  
        for(var i=1;i<=this.cells.length-1;i++)
        {
            if(X==this.cells[i].x&&Y==this.cells[i].y)
                game_over=true;
        }
        this.cells.unshift({x:X,y:Y});
        console.log("speed= ",speed);
        
    }

    }
    function keypressed(e)
    {
        if(e.key=="ArrowUp")
            snake.direction="up";
        else if(e.key=="ArrowLeft")
            snake.direction="left";
        else if(e.key=="ArrowRight")
            snake.direction="right";
        else if(e.key=="ArrowDown")
            snake.direction="down"
        console.log(snake.direction);

    }
 snake.mksnake();
 document.addEventListener('keydown',keypressed);
}
function draw()
{   
    pen.clearRect(0,0,W,H);
    snake.drawsnake();
    pen.drawImage(trophy,18,20,cs,cs);  
    pen.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);
    pen.font="15px Roboto";
    pen.fillStyle="blue";
    pen.fillText(score,30,35);
    
}
function update()
{
    snake.updatesnake();
}
function getRandomFood()
{
    var xfood=Math.round(Math.random()*(W-cs)/cs);
    var yfood=Math.round(Math.random()*(H-cs)/cs);
    var food=
    {
        x:xfood,
        y:yfood,
        color:"Red",
    }
    return food;
}
function gameloop()
{ 
    if(game_over==true)
    {
        clearInterval(f);
        alert("Game over");
        return;
    }
    draw();
    update();
    
     
}

init();
var f=setInterval(gameloop,speed);
