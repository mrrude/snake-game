var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var snakeW = 10;
var snakeH = 10;
var col = 0;
var score = 0;
function drawsnake(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x * snakeW, y * snakeH, snakeH, snakeW)
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeH, snakeH)
}
function drawsnakehead(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * snakeW, y * snakeH, snakeH, snakeW)
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeH, snakeH)
}
function drawscoreboard(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x * snakeW, y * snakeH, cvs.width, snakeW)
}
var dir = "down";
var done = 0;
var len = 5;
var snake = [];
for (var i = len - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 5
    })
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10,30,200);
}
document.addEventListener("keydown", control)
function control(e) {
    if (e.keyCode == 37 && dir!="right" ) {
        dir = "left";
    }
    else if (e.keyCode == 38&& dir!="down") {
        dir = "up";
    }
    else if (e.keyCode == 39&& dir!="left") {
        dir = "right";
    }
    else if (e.keyCode == 40 && dir != "up")
       {
        dir = "down";
    }
}
var food = {
    x: Math.round(Math.random() * ((cvs.width / snakeW) - 1) + 1),
    y: Math.round(Math.random() * ((cvs.height / snakeH) - 10) + 4)
}
function drawfood(x,y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * snakeW, y * snakeH, snakeH, snakeW)
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeH, snakeH)
}
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (var i = 0; i < snake.length; i++) {
        p = snake[i].x;
        q = snake[i].y;
        if (col == 0) {
            drawsnake(p, q)
            col = 1;
        }
        else {
            drawsnakehead(p, q)
        }
    }
    col = 0;
    drawscoreboard(0, 1)
    drawscoreboard(0, 0)
    drawscoreboard(0, 2)
    drawscoreboard(0, 3)
    if (done == 1) {
        alert("game over");
        document.location.reload();
        clearInterval(interval);
    }
    drawfood(food.x, food.y)
    drawScore()
    var l = snake[0].x;
    var t = snake[0].y;
    if (l < 0 || t < 4 || l > cvs.width / snakeH - 1 || t > cvs.width / snakeH - 1) {
        alert("game over");
        document.location.reload();
        clearInterval(interval);
    }
    if (dir == "right") {
        l++;
    }
    else if (dir == "left") {
        l--;
    }
    else if (dir == "up") {
        t--;
    }
    else if(dir=="down") {
        t++;
    }
    for (var k = 0; k < snake.length; k++) {
        if (snake[k].x == l && snake[k].y == t) {
            done = 1;  
        }
    }
    if (food.x == l && food.y == t) {
        score = score + 1;
        food = {
            x: Math.round(Math.random() * ((cvs.width / snakeW) - 1) + 1),
            y: Math.round(Math.random() * ((cvs.height / snakeH) - 10) + 4)
            }
        var newhead = {
            x: l,
            y: t
        }
    }
    else {
        snake.pop();
        var newhead = {
            x: l,
            y: t
        }
    }
    snake.unshift(newhead);
}
setInterval(draw,100)