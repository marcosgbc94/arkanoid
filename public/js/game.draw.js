/* GAME DIBUJO */

/**
 * Dibuja las pelotas en el canvas
 * @returns {Boolean}
 */
function gameDrawBall() {
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    GAME.balls.forEach(ball => {
        let borderWidth = 0;
        if (ball.borderWidth !== undefined && ball.borderWidth !== null)
            borderWidth = ball.borderWidth;

        GAME.context.beginPath();
        GAME.context.arc(ball.left, (ball.top + ball.radius + borderWidth), (ball.radius + (borderWidth*2)), 0, Math.PI * 2);
        GAME.context.fillStyle = gameGetColor(ball.color);
        GAME.context.fill();
        if ((ball.borderWidth !== undefined && ball.borderWidth !== null) && (ball.borderColor !== undefined && (ball.borderColor !== null))) {
            GAME.context.lineWidth = ball.borderWidth;
            GAME.context.strokeStyle = gameGetColor(ball.borderColor);
            GAME.context.stroke();
        }
        GAME.context.closePath();
    });

    return true;
}

/**
 * Dibuja los bloques en el canvas
 * @returns {Boolean}
 */
function gameDrawBlocks(){
    if (!GAME.blocks || GAME.blocks === undefined || GAME.blocks === null) 
        return false;

    GAME.blocks.forEach((block) => {
        GAME.context.beginPath();
        if (block.borderColor !== undefined && block.borderColor !== null) {
            GAME.context.fillStyle = gameGetColor(block.borderColor);
        } else {
            GAME.context.fillStyle = "transparent";
        }
        GAME.context.fillRect(block.left, block.top, GAME.block.width, GAME.block.height);
        GAME.context.fillStyle = gameGetColor(block.color);
        GAME.context.fillRect(block.left + GAME.block.borderWidth, block.top + GAME.block.borderWidth, GAME.block.width - (GAME.block.borderWidth*2), GAME.block.height - (GAME.block.borderWidth*2));
        GAME.context.closePath();
    });

    return true;
}

/**
 * Dinuja los poderes cayendo en el canvas
 * @returns {Boolean}
 */
function gameDrawPowers() {
    if (GAME.powersCurrents === undefined || GAME.powersCurrents === null)
        return false;

    GAME.powersCurrents.forEach((power) => {
        GAME.context.beginPath();
        GAME.context.fillStyle = gameGetColor(power.color);
        GAME.context.fillRect(power.left, power.top, GAME.block.width, GAME.block.height);
        GAME.context.closePath();
        power.top += power.directionTop;
    });

    return true;
}

/**
 * Buja al jugador en el canvas
 * @returns {Boolean}
 */
function gameDrawPlayer() {
    if (GAME.player === undefined || GAME.player === null)
        return false;

    GAME.context.beginPath();
    GAME.context.fillStyle = gameGetColor(GAME.player.color);
    GAME.context.fillRect(GAME.player.left, GAME.player.top, GAME.player.width, GAME.player.height);
    GAME.context.closePath();

    return true;
}