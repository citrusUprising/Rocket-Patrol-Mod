let config = {
type: Phaser.CANVAS, /*Loads 2d web renderer*/
width: 640, /*game width (adjustable)*/
height: 480, /*game height (adjustable)*/
scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);/*Loads game*/

//Game difficulty
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

let keySPACE, keyLEFT, keyRIGHT, keyUP;