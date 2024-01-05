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
GAME.darkMode ? GAME.player.color = 2 : GAME.player.color = 3;
GAME.player.speedMovement = 5;
GAME.player.speedFirstBall = 2;
GAME.player.points = 0;
GAME.player.lives = 5;
GAME.player.currentLives = GAME.player.lives;
// PELOTAS
GAME.balls = [{
    left: (GAME.screen.width/2), 
    directionLeft: 0, 
    top: (GAME.screen.height - GAME.player.height - 20), 
    directionTop: 0, 
    color: (GAME.darkMode ? 2 : 1), 
    radius: 5, 
    borderWidth: null, 
    borderColor: null
}];
// BLOQUES
GAME.block = {};
GAME.block.height = (GAME.screen.height/40);
GAME.block.width = (GAME.screen.width/44);
GAME.block.borderWidth = 1;
GAME.block.points = 100;
GAME.block.lessPoints  = 500;
GAME.blocks = [];
// PODERES
GAME.power = {};
GAME.power.probability = 0.75;
GAME.powers = [
    {id: 1, name: "Multiples pelotas", color: 1},
    {id: 2, name: "Barra alargada", color: 2}
];
GAME.powersCurrents = [];
GAME.powerPlayerActived = false;
// COLORES
GAME.colors = [
    'transparent',
    'black',
    'white',
    'blue',
    'green'
];