/* GAME */

let intervalChargeFirstBall;
let gameBallsTemp;

window.addEventListener('load', () => {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    if (!document.getElementById("game") || document.getElementById("game") === undefined || document.getElementById("game") === null) {
        msgManager(true, 'Error', 'No se logró encontrar el elemento principal del juego.', false);
        GAME.fatalError = true;
    }

    if (!document.getElementById("info") || document.getElementById("info") === undefined || document.getElementById("info") === null) {
        msgManager(true, 'Error', 'No se logró encontrar el elemento informativo del juego.', false);
        GAME.fatalError = true;
    }

    // Se carga color de fondo del juego
    if (!setStyleToElement(document.getElementById("info"), 'max-width', `${GAME.screen.width}px`))
        msgManager(true, 'Error', 'No se logró cargar el tamaño del elemento informativo del juego.');

    intervalChargeFirstBall = {};
    intervalChargeFirstBall.time = 0;
    gameBallsTemp = [];

    GAME.element = document.getElementById("game");
    GAME.context = GAME.element.getContext("2d");
    GAME.element.width = GAME.screen.width;
    GAME.element.height = GAME.screen.height;
    GAME.init = false;
    GAME.paused = false;
    GAME.player.movingLeft = false;
    GAME.player.movingRight = false;

    // Se carga color de fondo del juego
    if (!setStyleToElement(GAME.element, 'background-color', GAME.screen.bgColor))
        msgManager(true, 'Error', 'No se logró cargar el color de fondo del juego.');

    setGameLevel();
    window.requestAnimationFrame(gameInit);
});

function gameInit() {
    gameDraw();
}

function gameDraw() {
    GAME.context.clearRect(0, 0, GAME.screen.width, GAME.screen.height);
    gameDrawBall();
    gameDrawPlayer();
    gameDrawBlocks();
    gameCollitionBallWithScreen();
    gameCollitionBallWithBalls();
    gameCollitionBallWithPlayer();
    gameBallsMove();
    gamePlayerMove();

    window.requestAnimationFrame(gameInit);
}

function setGameLevel() {
    if (!GAME.level || GAME.level === undefined || GAME.level === null)
        return null;

    try {
        const blocks = getGameLevel(GAME.level);

        if (!blocks || blocks === undefined || blocks === null)
            return false;

        GAME.blocks = blocks;

        return true;
    } catch (err) {
        return false;
    } 
}

function gameDrawBall() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    GAME.balls.forEach(ball => {
        GAME.context.beginPath();
        GAME.context.arc(ball.left, (ball.top + ball.radius), ball.radius, 0, Math.PI * 2);
        GAME.context.fillStyle = ball.color;
        GAME.context.fill();
        if ((ball.borderWidth !== undefined && ball.borderWidth !== null) && (ball.borderColor !== undefined && (ball.borderColor !== null))) {
            GAME.context.lineWidth = ball.borderWidth;
            GAME.context.strokeStyle = ball.borderColor;
            GAME.context.stroke();
        }
        GAME.context.closePath();
    });

    return true;
}

function gameDrawBlocks(){
    if (!GAME.blocks || GAME.blocks === undefined || GAME.blocks === null) 
        return false;

    let heightCount = 0;
    let widthCount = 0;
    GAME.blocks.rows.forEach((row) => {
        row.columns.forEach((column) => {
            if (column.state !== 0) {
                GAME.context.beginPath();
                GAME.context.fillStyle = gameGetColorBLock(column.color);
                GAME.context.fillRect(widthCount, heightCount, GAME.block.width, GAME.block.height);
                GAME.context.closePath();
            }
            widthCount += GAME.block.width;
        });
        widthCount = 0;
        heightCount += GAME.block.height;
    });
}

function gameGetColorBLock(color) {
    if (!color || color === undefined || color === null)
        return false;

    const colors = ['black', 'blue', 'green'];

    return colors[color];
}

function gameCollitionBallWithScreen() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    GAME.balls.forEach((ball, index) => {
        if ((ball.left + ball.directionLeft) > (GAME.screen.width - ball.radius) || (ball.left + ball.directionLeft) < ball.radius)
            GAME.balls[index].directionLeft = -GAME.balls[index].directionLeft;
        if ((ball.top + ball.directionTop) > (GAME.screen.height - ball.radius) || (ball.top + ball.directionTop) < ball.radius)
            GAME.balls[index].directionTop = -GAME.balls[index].directionTop;
    });

    return true;
}

function gameCollitionBallWithBalls() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length <= 1)
        return false;

    GAME.balls.forEach((ball, index) => {
        const ballPosition = { left: ball.left, right: (ball.left + (ball.radius * 2)), top: ball.top, bottom: (ball.top + (ball.radius * 2)), ballCenterH: (ball.left + ball.radius), ballCenterV: (ball.top + ball.radius) }
        GAME.balls.forEach((ball_2, index_2) => {
            if (index !== index_2) {
                const ballPosition_2 = { left: ball_2.left, right: (ball_2.left + (ball_2.radius * 2)), top: ball_2.top, bottom: (ball_2.top + (ball_2.radius * 2)), ballCenterH: (ball_2.left + ball_2.radius), ballCenterV: (ball_2.top + ball_2.radius) }
                // LEFT
                if ((ballPosition.right >= ballPosition_2.left && ballPosition.ballCenterH <= ballPosition_2.left) && (ballPosition.ballCenterV >= ballPosition_2.top && ballPosition.ballCenterV <= ballPosition_2.bottom)) {
                    GAME.balls[index].directionLeft = -GAME.balls[index].directionLeft;
                }
                // RIGHT
                if ((ballPosition.left <= ballPosition_2.right && ballPosition.ballCenterH >= ballPosition_2.right) && (ballPosition.ballCenterV >= ballPosition_2.top && ballPosition.ballCenterV <= ballPosition_2.bottom)) {
                    GAME.balls[index].directionLeft = -GAME.balls[index].directionLeft;
                }
                // TOP
                if ((ballPosition.bottom >= ballPosition_2.top && ballPosition.ballCenterV <= ballPosition_2.top) && (ballPosition.ballCenterH >= ballPosition_2.left && ballPosition.ballCenterH <= ballPosition_2.right)) {
                    GAME.balls[index].directionTop = -GAME.balls[index].directionTop;
                }
                // BOTTOM
                if ((ballPosition.top <= ballPosition_2.bottom && ballPosition.ballCenterV >= ballPosition_2.bottom) && (ballPosition.ballCenterH >= ballPosition_2.left && ballPosition.ballCenterH <= ballPosition_2.right)) {
                    GAME.balls[index].directionTop = -GAME.balls[index].directionTop;
                }
            }
        });
    });

    return true;
}

function gameCollitionBallWithPlayer() {
    if (GAME.balls === undefined || GAME.balls === null)
        return false;
    if (GAME.player === undefined || GAME.player === null)
        return false;

    GAME.balls.forEach((ball) => {
        if ((ball.top + ball.radius) >= GAME.player.top && (ball.top + ball.radius) <= (GAME.player.top + GAME.player.height)) {
            if ((ball.left + ball.radius >= GAME.player.left) && (ball.left + ball.radius <= (GAME.player.left + GAME.player.width))) {
                if (GAME.player.movingLeft || GAME.player.movingRight) {
                    ball.directionLeft = 8 * ((ball.left - ( GAME.player.left + (GAME.player.width/2)))/ GAME.player.width);
                } else {
                    ball.directionLeft = 4 * ((ball.left - ( GAME.player.left + (GAME.player.width/2)))/ GAME.player.width);
                }
                ball.directionTop = -ball.directionTop
            }
        }
    });

    return true;
}

function gameBallsMove() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    for (index = 0; index < GAME.balls.length; index++) {
        GAME.balls[index].left += GAME.balls[index].directionLeft;
        GAME.balls[index].top += GAME.balls[index].directionTop;
    }

    return true;
}

function gamePlayerMove() {
    if (GAME.paused)
        return false;
    if (GAME.player.speedMovement === undefined || GAME.player.speedMovement === null)
        return false;

    if (GAME.player.movingLeft) {
        if (GAME.player.left >= GAME.player.speedMovement) {
            GAME.player.left -= GAME.player.speedMovement;
            if (!GAME.init && GAME.balls.length > 0) {
                GAME.balls[0].left -= GAME.player.speedMovement;
            }
        }
    } else if (GAME.player.movingRight) {
        const playerRight = (GAME.player.left + GAME.player.width);
        if (playerRight < GAME.screen.width) {
            GAME.player.left += GAME.player.speedMovement;
            if (!GAME.init && GAME.balls.length > 0) {
                GAME.balls[0].left += GAME.player.speedMovement;
            }
        }
    }
}

function gameDrawPlayer() {
    if (GAME.player === undefined || GAME.player === null)
        return false;

    GAME.context.beginPath();
    GAME.context.fillStyle = GAME.player.color;
    GAME.context.fillRect(GAME.player.left, GAME.player.top, GAME.player.width, GAME.player.height);
    GAME.context.closePath();
}

function gamePlayerInitMovementBall(key) {
    if (GAME.init || !key || key === undefined || key === null)
        return false;
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;
    if (GAME.player === undefined || GAME.player === null)
        return false;
    
    if (key === 'keydown') {
        intervalChargeFirstBall.interval = setInterval(() => {
            intervalChargeFirstBall.time++;
        });
    } else if (key === 'keyup') {
        clearInterval(intervalChargeFirstBall.interval);
        GAME.init = true;
        if (intervalChargeFirstBall.time < 5000) {
            GAME.balls[0].directionTop = -(GAME.player.speedFirstBall + (intervalChargeFirstBall.time/1000));  
        } else {
            GAME.balls[0].directionTop = -(GAME.player.speedFirstBall + 5);  
        }
        intervalChargeFirstBall.time = 0;
    }

    return true;
}

function gamePause() {
    if (!GAME.init)
        return false;
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    if (GAME.paused) {
        GAME.paused = false;
        gameBallsTemp.forEach((ball, index) => {
             GAME.balls[index].directionLeft = ball.directionLeft;
             GAME.balls[index].directionTop = ball.directionTop;
        });
        gameBallsTemp = [];
    } else {
        GAME.paused = true;
        GAME.balls.forEach((ball, index) => {
            gameBallsTemp[index] = [];
            gameBallsTemp[index]['directionLeft'] = ball.directionLeft;
            ball.directionLeft = 0;
            gameBallsTemp[index]['directionTop'] = ball.directionTop;
            ball.directionTop = 0;
        });
    }
}

function gameSetPlayerPoints(newPoints) {
    if (newPoints === undefined || newPoints === null)
        return false;

    const info = document.getElementById('info');

    if (!info || info === undefined || info === null)
        return false;

    info.innerHTML = `Puntaje: ${newPoints} pts.`;
}

window.addEventListener('keydown', (e) => {
    switch (e.code.toString().toLocaleLowerCase()) {
        case 'arrowleft':
            GAME.player.movingLeft = true;
            break;
        case 'arrowright':
            GAME.player.movingRight = true;
            break;
        case 'space':
            if (GAME.init) {
                gamePause();
            } else {
                gamePlayerInitMovementBall('keydown');
            }
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code.toString().toLocaleLowerCase()) {
        case 'arrowleft':
            GAME.player.movingLeft = false;
            break;
        case 'arrowright':
            GAME.player.movingRight = false;
            break;
        case 'space':
            if (!GAME.init) {
                gamePlayerInitMovementBall('keyup');
            }
            break;
    }
});