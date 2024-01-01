/* GAME */


/**
 * Inicializa el juego comenzando a dibujar en el canvas
 */
function gameInit() {
    gameDraw();
}

/**
 * Dibuja todo el contenido en el canvas
 */
function gameDraw() {
    GAME.context.clearRect(0, 0, GAME.screen.width, GAME.screen.height);
    gameDrawBall();
    gameDrawPlayer();
    gameDrawBlocks();
    gameCollitionBallsWithScreen();
    gameCollitionBallWithBalls();
    gameCollitionBallsWithPlayer();
    gameCollitionBallsWithBlocks();
    gameCollitionPlayerWithPowers();
    gameBallsMove();
    gamePlayerMove();
    gameDrawPowers();

    window.requestAnimationFrame(gameInit);
}

/**
 * Establece el nivel del juego
 * @returns {Boolean}
 */
function setGameLevel() {
    if (!GAME.level || GAME.level === undefined || GAME.level === null)
        return false;

    try {
        const blocks = getGameLevel(GAME.level);

        if (!blocks || blocks === undefined || blocks === null)
            return false;

        GAME.blocks = gameConvertLevelToBlocks(blocks);

        return true;
    } catch (err) {
        return false;
    } 
}

/**
 * Obtiene el color en base a un identificador
 * @param {Number} color Identificador del color
 * @returns {Boolean|String}
 */
function gameGetColor(color) {
    if (GAME.colors === undefined || GAME.colors === null || GAME.colors.length === 0)
        return false;
    if (!color || color === undefined || color === null)
        return false;

    return GAME.colors[color];
}

/**
 * Convierte un arreglo de bloques leído de un JSON en uno con todas sus propiedades para ser dibujado
 * @param {Array} blocks Arreglo de bloques
 * @returns {Boolean|Array}
 */
function gameConvertLevelToBlocks(blocks) {
    if (blocks === undefined || blocks === null || blocks.length === 0)
        return false;

    let heightCount = 0;
    let widthCount = 0;
    let blockCount = 0;
    const blocksAux = [];

    blocks.rows.forEach((row) => {
        row.columns.forEach((column) => {
            if (column.state !== 0) {
                blocksAux[blockCount] = { 
                    state: column.state,
                    left: widthCount, 
                    top: heightCount,
                    color: column.color,
                    borderColor: column.borderColor
                };
            }
            widthCount += GAME.block.width;
            blockCount++;
        });
        widthCount = 0;
        heightCount += GAME.block.height;
        blockCount++;
    });
    
    return blocksAux;
}

/**
 * Pausa o reanuda un juego pausado
 * @returns {Boolean}
 */
function gamePause() {
    if (!GAME.init)
        return false;
    if (GAME.balls === undefined || GAME.balls === null || GAME.balls.length === 0)
        return false;

    if (GAME.paused) {
        // Se reanuda el juego
        GAME.paused = false;
        gameBallsTemp.forEach((ball, index) => {
             GAME.balls[index].directionLeft = ball.directionLeft;
             GAME.balls[index].directionTop = ball.directionTop;
        });
        gameBallsTemp = [];
        if (gamePowersTemp.length > 0) {
            gamePowersTemp.forEach((power, index) => {
                GAME.powersCurrents[index].directionTop = power.directionTop;
            });
            gamePowersTemp = [];
        }
    } else {
        // Se pausa el juego
        GAME.paused = true;
        GAME.balls.forEach((ball, index) => {
            gameBallsTemp[index] = [];
            gameBallsTemp[index]['directionLeft'] = ball.directionLeft;
            ball.directionLeft = 0;
            gameBallsTemp[index]['directionTop'] = ball.directionTop;
            ball.directionTop = 0;
        });
        if (GAME.powersCurrents.length > 0) {
            GAME.powersCurrents.forEach((power, index) => {
                gamePowersTemp[index] = [];
                gamePowersTemp[index]['directionTop'] = power.directionTop;
                power.directionTop = 0;
            });
        }
    }

    return true;
}

/**
 * Actualiza la puntuación del jugar por pantalla
 * @param {Number} newPoints Nuevo puntaje a actualiza
 * @returns {Boolean}
 */
function gameSetPlayerPoints(newPoints) {
    if (newPoints === undefined || newPoints === null)
        return false;

    const info = document.getElementById('info');

    if (!info || info === undefined || info === null)
        return false;

    info.innerHTML = `Puntaje: ${newPoints} pts.`;

    return true;
}

/**
 * Carga el nivel de juego
 * @param {Number} level Nivel del juego a cargar
 * @returns {Boolean|Object}
 */
function getGameLevel(level) {
    if (!level || level === undefined || level === null)
        return false;

    try {
        const request = new XMLHttpRequest();
        request.open('POST', `./src/levels/level_${level}.json`, false);
        request.send(null);
        if (request.status !== 200) {
            return  false;
        }

        return JSON.parse(request.responseText);
    } catch (error) {
        return false;
    }
}
