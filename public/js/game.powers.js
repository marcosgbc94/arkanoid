/* GAME PODERES */

/**
 * Genera un poder para que caiga en el canvas
 * @param {Number} left Posición izquierda del bloque
 * @param {Number} top Posición superior del bloque
 * @returns {Boolean}
 */
function gameGeneratePower(left, top) {
    if (GAME.powers === undefined || GAME.powers === null || GAME.powers.length === 0)
        return false;
    if (left === undefined || left === null)
        return false;
    if (top === undefined || top === null)
        return false;

    const randomNumber = Math.floor((Math.random() * GAME.powers.length) + 1);
    const power = GAME.powers[randomNumber - 1];

    if (power === undefined || power === null)
        return false;

    GAME.powersCurrents.push({
        id: power.id, 
        color: power.color, 
        left: left, 
        directionTop: 2,
        top: top
    });

    return true;
}

/**
 * Genera un poder en el jugador cuando este lo adquiere
 * @param {Number} id Identificador del poder a ser generado
 * @returns {Boolean}
 */
function gameGeneratePowerPlayer(id) {
    if (!id || id === undefined || id === null)
        return false;

    switch (id) {
        case 1:
            gamePowerAddBall();
            break;
        case 2:
            gamePowerPlayerExtraWidth();
            break;
    }

    return true;
}

/**
 * Activa poder para agregar una nueva bola al juego
 * @returns {Boolean}
 */
function gamePowerAddBall() {
    if (GAME.balls[0] === undefined || GAME.balls[0] === null)
        return false;

    if (GAME.powerPlayerActived) {
        gamePowerPlayerExtraWidth();
    }

    const firstBall = GAME.balls[0];
    GAME.balls.push({
        left: firstBall.left + 10, 
        directionLeft: firstBall.directionLeft, 
        top: firstBall.top + 10, 
        directionTop: firstBall.directionTop, 
        color: firstBall.color, 
        radius: firstBall.radius, 
        borderWidth: firstBall.borderWidth, 
        borderColor: firstBall.borderColor
    });

    return true;
}

/**
 * Activa el poder para que barra de jugador se alargue
 * @returns {Boolean}
 */
function gamePowerPlayerExtraWidth() {
    if (!GAME.powerPlayerActived) {
        GAME.player.width += 50;
        GAME.powerPlayerActived = true;
        return true;
    }

    GAME.powerPlayerActived = false;
    GAME.player.width -= 50;

    return true;
}