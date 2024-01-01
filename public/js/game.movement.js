/* GAME MOVIMIENTO */

/**
 * Mueve las pelotas en el canvas
 * @returns {Boolean}
 */
function gameBallsMove() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    for (index = 0; index < GAME.balls.length; index++) {
        GAME.balls[index].left += GAME.balls[index].directionLeft;
        GAME.balls[index].top += GAME.balls[index].directionTop;
    }

    return true;
}

/**
 * Mueve el jugador en el canvas
 * @returns {Boolean}
 */
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

    return true;
}

/**
 * Inicializa el primer movimiento de la bola según potencia dada
 * @param {String} key Nombre del evento de teclado
 * @returns {Boolean}
 */
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