/* GAME EVENTOS */

let intervalChargeFirstBall;
let gameBallsTemp;
let gamePowersTemp;

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
    gamePowersTemp = [];

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

    gameSetPlayerInfo(GAME.player.points, GAME.player.currentLives);
    setGameLevel();
    window.requestAnimationFrame(gameInit);
});

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