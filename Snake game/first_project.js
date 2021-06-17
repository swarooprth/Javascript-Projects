function init()
{
canvas=document.getElementById("mycanvas")
W=canvas.width=500
H=canvas.height=500
pen=canvas.getContext('2d');
game_over=false;

rect={
    x:20,
    y:20,
    w:40,
    h:40,
    speed:20,
}
}
function draw()
{
    pen.clearRect(0,0,W,H);
    pen.fillRect(rect.x,rect.y,rect.w,rect.h);
    pen.fillStyle="red";
}
function update()
{
    rect.x+=rect.speed;
    if(rect.x>W-rect.w||rect.x<0)
    rect.speed*=-1;
}
function gameloop()
{if(game_over==true)
return;
    draw()
    update()
}
init();
setInterval(gameloop,100);

