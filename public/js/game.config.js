/* GAME CONFIG */

const GAME = {};

// GENERALES
GAME.fatalError = false;
GAME.darkMode = hasDarkMode();
GAME.level = 1;
// PANTALLA
GAME.screen = {};
GAME.screen.width = 800;
GAME.screen.height = 600;
GAME.darkMode ? GAME.screen.bgColor = 'blue' : GAME.screen.bgColor = 'aqua';
// JUAGADOR
GAME.player = {};
GAME.player.name = null;
GAME.player.width = 100;
GAME.player.height = 5;
GAME.player.left = ((GAME.screen.width/2) - (GAME.player.width/2));
GAME.player.top = (GAME.screen.height - GAME.player.height - 10);
GAME.darkMode ? GAME.player.color = 'white' : GAME.player.color = 'blue';
GAME.player.speedMovement = 5;
GAME.player.speedFirstBall = 2;
// PELOTAS
GAME.balls = [
    {left: (GAME.screen.width/2), directionLeft: 0, top: (GAME.screen.height - GAME.player.height - 20), directionTop: 0, color: (GAME.darkMode ? 'white' : 'black'), radius: 5, borderWidth: null, borderColor: null}
];
// BLOQUES
GAME.block = {};
GAME.block.height = (GAME.screen.height/24);
GAME.block.width = (GAME.screen.width/24);
GAME.blocks = [];