const board = document.getElementById("board");

const COLS =20;
const ROWS =20;
const cellsize = board.clientwidth/COLS;

let snake={x:10,y:10};
let food={x:5,y:5}
let direction = {x:1,y:0} //right movement
let nextdirection = {x:1,y:0}
let game_interval = null;

function startgame()
{
    placefood();
    document.addEventListener(Keydown,handlekey);
    game_interval=setInterval(gameloop,150)
}

function placefood()
{
    food.x=Math.floor(Math.random()*COLS);
    food.y=Math.floor(Math.random()*ROWS);
}

function handlekey(evnt)
{
    switch(evnt.key)
    {
        case Arrowup:
        if (direction.y!==1) nextdirection= {x:0 , y:-1};
        break;
        case Arrowdown:
        if (direction.y!==-1) nextdirection= {x:0 , y:1};
        break;
        case Arrowup:
        if (direction.y!==1) nextdirection= {x:-1 , y:0};
        break;
        case Arrowup:
        if (direction.y!==-1) nextdirection= {x:1 , y:-0};
        break;
    }
}

function gameloop()
{
    const head = {x:snake(0)+direction.x , y: snake(0) + direction.y}

    if (head.x<0 || head.x>=COLS || head.y<0 || head.y>=ROWS){
        gameover();
    return;
    }


for( let segment of snake)
{
    if(segment.x===head.x && segment.y===head.y){
        gameover();
        return;
    }
}

snake.unshift(head);

if(head.x===food.x && head.y===food.y)
{
    placefood();

}
else{
    snake.pop()
}

draw();

}

function draw()
{
    board.innerHTML="";
    for (let seg of snake)
     {
        const segEl = document.createElement("div");
        segEl.style.position = "absolute";
        segEl.style.width = `${CELL_SIZE}px`;
        segEl.style.height = `${CELL_SIZE}px`;
        segEl.style.left = `${seg.x * CELL_SIZE}px`;
        segEl.style.top = `${seg.y * CELL_SIZE}px`;
        segEl.style.background = "lime";
        board.appendChild(segEl);
      }

 const fEl = document.createElement("div");
  fEl.style.position = "absolute";
  fEl.style.width = `${CELL_SIZE}px`;
  fEl.style.height = `${CELL_SIZE}px`;
  fEl.style.left = `${food.x * CELL_SIZE}px`;
  fEl.style.top = `${food.y * CELL_SIZE}px`;
  fEl.style.background = "red";
  board.appendChild(fEl);
}

function gameover()
{
    clearInterval(game_interval);
    alert("game over");

}

startgame();
