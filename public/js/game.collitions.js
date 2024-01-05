/* GAME COLICIONES */

/**
 * Detecta la colición entre las pelotas con los límites del canvas
 * @returns {Boolean}
 */
function gameCollitionBallsWithScreen() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    GAME.balls.forEach((ball, index) => {
        if ((ball.top + ball.directionTop + ball.radius) >= GAME.screen.height) {
            GAME.balls.splice(index, 1);
            if (GAME.balls.length === 0) {
                gameOver();
                return true;
            }
        } else {
            if ((ball.left + ball.directionLeft) > (GAME.screen.width - ball.radius) || (ball.left + ball.directionLeft) < ball.radius)
                GAME.balls[index].directionLeft = -GAME.balls[index].directionLeft;
            if ((ball.top + ball.directionTop) > (GAME.screen.height - ball.radius) || (ball.top + ball.directionTop) < ball.radius)
                GAME.balls[index].directionTop = -GAME.balls[index].directionTop;
        }
    });

    return true;
}

/**
 * Detecta la colición entre pelotas en el canvas
 * @returns {Boolean}
 */
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
/**
 * Detcta la colición de las pelotas con los bloques en el canvas
 * @returns {Boolean}
 */
function gameCollitionBallsWithBlocks() {
    if (GAME.balls === undefined || GAME.balls === null)
        return false;
    if (GAME.blocks === undefined || GAME.blocks === null)
        return false;

    GAME.balls.forEach((ball, indexBall) => {
        GAME.blocks.forEach((block, indexBlock) => {
            if ((ball.top - (ball.radius*2)) < (block.top + GAME.block.height) && (ball.top - (ball.radius*2)) > block.top) {
                if ((ball.left + (ball.radius*2)) > block.left && (ball.left - (ball.radius*2)) < (block.left + GAME.block.width)) {
                    GAME.balls[indexBall].top = ball.top + 5;
                    GAME.balls[indexBall].directionTop = - ball.directionTop;

                    if (block.state === 1) {
                        GAME.blocks.splice(indexBlock, 1);
                        if (GAME.blocks.length > 0) {
                            GAME.player.points += GAME.block.points;
                            gameSetPlayerInfo(GAME.player.points, GAME.player.currentLives);
                            const randomNumber = (Math.random() * 100);
                            if (randomNumber < (100*GAME.power.probability)) {
                                gameGeneratePower(block.left, block.top);
                            }
                        } else {
                            gameSuccess();
                            return true;
                        }
                    }
                }
            }
        });
    });

    return true;
}

/**
 * Detecta la colición de las pelotas con el jugador en el canvas
 * @returns {Boolean}
 */
function gameCollitionBallsWithPlayer() {
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

/**
 * Detecta la colición del jugador con los pederes que bajan
 * @returns {Boolean}
 */
function gameCollitionPlayerWithPowers() {
    if (GAME.player === undefined || GAME.player === null)
        return false;
    if (GAME.powersCurrents === undefined || GAME.powersCurrents === null || GAME.powersCurrents.length === 0)
        return false;

    GAME.powersCurrents.forEach((power, index) => {
        if (power.left >= GAME.player.left && (power.left + GAME.block.width) <= (GAME.player.left + GAME.player.width)) {
            if ((power.top + GAME.block.height) >= (GAME.player.top + GAME.player.height) && power.top <= (GAME.player.top)) {
                GAME.powersCurrents.splice(index, 1);
                gameGeneratePowerPlayer(power.id);
            }
        }
    });

    return true;
}

function gameCollitionPowerWithScreen() {
    if (GAME.powersCurrents === undefined || GAME.powersCurrents === null || GAME.powersCurrents.length === 0)
        return false;

    GAME.powersCurrents.forEach((power, index) => {
        if (power.top >= GAME.screen.height) {
            GAME.powersCurrents.splice(index, 1);
            if (GAME.powersCurrents.length === 0)
                return true; 
        }
    });

    return true;
}