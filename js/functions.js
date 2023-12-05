let gameCanvas;
let gameCanvasContext;
let dx;
let dy;

let gameInit;
let ball = {};
let player = {};
let screenProperties = {};
let blocks = [];
let materialsColors = {};

window.addEventListener('load', () => {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    gameCanvas = document.getElementById("game-canvas");
    gameCanvasContext = gameCanvas.getContext("2d");

    // SCREEN PROPERTIES
    // screenProperties.width = window.innerWidth;
    // screenProperties.height = window.innerHeight;
    screenProperties.width = 506;
    screenProperties.height = 506;
    screenProperties.backgroundImage = 'universe.jpg';
    screenProperties.backgroundColor = 'aqua';
    screenProperties.gameBackgroundImage = '';
    screenProperties.gameBackgroundColor = 'antiquewhite';

    setScreenBackgroundColor();
    // setScreenBackgroundImage();

    gameCanvas.width = screenProperties.width;
    gameCanvas.height = screenProperties.height;
    
    gameInit = false;
    dx = 0;
    dy = 0;
    
    // PLAYER
    player.width = 100;
    player.height = 5;
    player.color = "black";
    player.left = (screenProperties.width/2) - (player.width/2);
    player.top = screenProperties.height - 100;
    player.points = 0;

    // BALL
    ball.radius = 5;
    ball.color = "black";
    ball.left = (screenProperties.width/2) - (ball.radius/2);
    ball.top = (screenProperties.height - 100) - player.height;

    // BLOCKS
    blocks = [
        [100, 100, 100, 20, 5, 'blue'],
        [201, 100, 100, 20, 5, 'blue'],
        [302, 100, 100, 20, 5, 'blue'],
        [100, 121, 100, 20, 4, 'red'],
        [201, 121, 100, 20, 4, 'red'],
        [302, 121, 100, 20, 4, 'red'],
        [100, 142, 100, 20, 3, 'green'],
        [201, 142, 100, 20, 3, 'green'],
        [302, 142, 100, 20, 3, 'green'],
        [100, 163, 100, 20, 2, 'blue'],
        [201, 163, 100, 20, 2, 'blue'],
        [302, 163, 100, 20, 2, 'blue'],
        [100, 184, 100, 20, 1, 'red'],
        [201, 184, 100, 20, 1, 'red'],
        [302, 184, 100, 20, 1, 'red']
    ];

    materialsColors.diamond = "#B9F2FF";
    materialsColors.gold = "#FFD60A";
    materialsColors.metal = "#71797E";
    materialsColors.wood = "#966F33";

    window.requestAnimationFrame(init);
});

window.addEventListener('keydown', (e) => {
    const key = e.code.toString().toLowerCase();

    switch (key) {
        case 'arrowleft':
            if (player.left >= 20) {
                player.left -= 20;
                if (!gameInit) {
                    ball.left -= 20;
                }
            }
            break;
        case 'arrowright':
            const playerRight = player.left + player.width;
            if (playerRight < screenProperties.width) {
                player.left += 20;
                if (!gameInit) {
                    ball.left += 20;
                }
            }
            break;
        case 'enter':
            gameMoveInit();
            break;
    }
});

function setScreenBackgroundColor() {
    const game = document.querySelector('#game');

    if (!game || game === undefined || game === null)
        return false;

    if (screenProperties.backgroundColor !== undefined && screenProperties.backgroundColor !== null) {
        game.style.backgroundColor = screenProperties.backgroundColor;

        if ((gameCanvas !== undefined && gameCanvas !== null) && (screenProperties.gameBackgroundColor !== '' && screenProperties.gameBackgroundColor !== undefined && screenProperties.gameBackgroundColor !== null)) {
            gameCanvas.style.backgroundColor = screenProperties.gameBackgroundColor;
        }

        return true;
    }

    return null;
}

function setScreenBackgroundImage() {
    const game = document.querySelector('#game');

    if (!game || game === undefined || game === null)
        return false;

    if (screenProperties.backgroundImage !== undefined && screenProperties.backgroundImage !== null) {
        game.style.backgroundImage = `url(./images/backgrounds/${screenProperties.backgroundImage})`;

        if ((gameCanvas !== undefined && gameCanvas !== null) && (screenProperties.gameBackgroundImage !== '' && screenProperties.gameBackgroundImage !== undefined && screenProperties.gameBackgroundImage !== null)) {
            gameCanvas.style.backgroundImage = screenProperties.gameBackgroundImage;
        }

        return true;
    }

    return null;
}

function setPlayerPoints() {
    const gamePlayerGame = document.querySelector('#game-info');

    if (player.points === undefined || player.points === null)
        return false;
    if (!gamePlayerGame || gamePlayerGame === undefined || gamePlayerGame === null)
        return false; 
    
    gamePlayerGame.innerHTML = `${player.points} pts.`;
}

function drawBlock() {
    gameCanvasContext.beginPath();
    blocks.forEach(block => {
        switch (block[4]) {
            case 1:  
                gameCanvasContext.fillStyle = block[5];
                gameCanvasContext.fillRect(block[0], block[1], block[2], block[3]);
                break;
            case 2:
                gameCanvasContext.fillStyle = materialsColors.wood;
                gameCanvasContext.fillRect(block[0], block[1], block[2], block[3]);
                break;
            case 3:
                gameCanvasContext.fillStyle = materialsColors.metal;
                gameCanvasContext.fillRect(block[0], block[1], block[2], block[3]);
                break;
            case 4:
                gameCanvasContext.fillStyle = materialsColors.gold;
                gameCanvasContext.fillRect(block[0], block[1], block[2], block[3]);
                break;
            case 5:
                gameCanvasContext.fillStyle = materialsColors.diamond;
                gameCanvasContext.fillRect(block[0], block[1], block[2], block[3]);
                break;
        }
    });
}

function drawBall() {
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(ball.left, ball.top, ball.radius, 0, Math.PI*2);
    gameCanvasContext.fillStyle = ball.color;
    gameCanvasContext.fill();
    gameCanvasContext.closePath();
}

function drawPlayerBar() {
    gameCanvasContext.beginPath();
    gameCanvasContext.fillStyle = player.color;
    gameCanvasContext.fillRect(player.left, player.top, player.width, player.height);
    gameCanvasContext.stroke();
}

function draw() {
    gameCanvasContext.clearRect(0, 0, screenProperties.width, screenProperties.height);
    drawBlock();
    drawBall();
    drawPlayerBar();
    
    checkCollitionScreen();
    checkCollitionPlayer();
    checkCollitionBlocks();
    
    setPlayerPoints();
    
    ball.left += dx;
    ball.top += dy;
    
    
    setTimeout(() => {
        window.requestAnimationFrame(init);
     }, 1);
}

function checkCollitionScreen() {
    if(ball.left + dx > screenProperties.width - ball.radius || ball.left + dx < ball.radius) {
        dx = -dx;
    }
    if(ball.top + dy > screenProperties.height - ball.radius || ball.top + dy < ball.radius) {
        dy = -dy;
        const ballBottom = ball.top + (ball.radius*2);
        if (ballBottom >= screenProperties.height) {
            gameLoss();
        }
    }
}

function checkCollitionPlayer() {
    if ((ball.left + dx > player.left && ball.left + dx < (player.left + player.width)) && (ball.top + dy > player.top && ball.top + dy < (player.top + player.height))) {
        dy = -dy;
        soundGameCollitionPlayer();
    }
}

function checkCollitionBlocks() {
    blocks.forEach((block, index) => {
        const ballLeft = ball.left + dx;
        const ballRight = (ball.left + dx) + (ball.radius*2);
        const ballTop = ball.top + dy;
        const ballBottom = (ball.top + dy) + (ball.radius*2);

        const blockLeft = block[0];
        const blockTop = block[1];
        const blockRight = block[0] + block[2];
        const blockBottom = block[1] + block[3];

        // LEFT
        if ((ballRight >= blockLeft && ballLeft < blockLeft) && (ballBottom >= (blockTop + ball.radius*2) && ballTop <= (blockBottom + ball.radius*2))) {
            dx = -dx;
            blockDestroyer(block, index);
            soundGameCollitionBlock();
            return true;
        }

        // RIGHT
        if ((ballLeft <= blockRight && ballRight > blockRight) && (ballBottom >= (blockTop + ball.radius*2) && ballTop <= (blockBottom + ball.radius*2))) {
            dx = -dx;
            blockDestroyer(block, index);
            soundGameCollitionBlock();
            return true;
        }

        // TOP
        if ((ballLeft <= blockRight && ballRight >= blockLeft) && (ballTop < blockTop && ballBottom >= blockTop)) {
            dy = -dy;
            blockDestroyer(block, index);
            soundGameCollitionBlock();
            return true;
        }

        // BOTTOM
        if ((ballLeft <= blockRight && ballRight >= blockLeft) && (ballTop <= blockBottom && ballBottom > blockBottom)) {
            dy = -dy;
            blockDestroyer(block, index);
            soundGameCollitionBlock();
            return true;
        }
    });
}

function blockDestroyer(block, index) {
    if (block === undefined || block === null)
        return false;
    if (index === undefined || index === null)
        return false;

    switch (block[4]) {
        case 1:
            blocks.splice(index, 1);
            player.points += 100;
            break;
        case 2:
            blocks[index][4] = 1;
            player.points += 100;
            break;
        case 3:
            blocks[index][4] = 2;
            player.points += 100;
            break;
        case 4:
            blocks[index][4] = 3;
            player.points += 100;
            break;
        case 5:
            blocks[index][4] = 4;
            player.points += 100;
            break;
    }
}

function gameLoss() {
    soundGameDefeat();
    player.points -= 500;
    gameMoveFinish();
    gamePlayerInit();
    gameBallInit();
}

function gamePlayerInit() {
    player.left = (screenProperties.width/2) - (player.width/2);
    player.top = screenProperties.height - 100;
}

function gameBallInit() {
    ball.left = (screenProperties.width/2) - (ball.radius/2);
    ball.top = (screenProperties.height - 100) - player.height;
}

function gameMoveInit() {
    if (gameInit || gameInit === undefined || gameInit === null)
        return false;

    gameInit = true;
    dx = 2;
    dy = -2;
    soundGameInitMoveBall();
}

function gameMoveFinish() {
    if (!gameInit || gameInit === undefined || gameInit === null)
        return false;

    gameInit = false;
    dx = 0;
    dy = 0;
}

function soundGameInitMoveBall() {
    const sound = new Audio('./sounds/init_move_ball.mp3');
    sound.play();
}

function soundGameCollitionPlayer() {
    const sound = new Audio('./sounds/collition_player.mp3');
    sound.play();
}

function soundGameCollitionBlock() {
    const sound = new Audio('./sounds/collition_block.mp3');
    sound.play();
}

function soundGameDefeat() {
    const sound = new Audio('./sounds/defeat.mp3');
    sound.play();
}

function init() {
    draw();
}