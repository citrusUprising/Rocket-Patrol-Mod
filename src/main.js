let config = {
type: Phaser.CANVAS, /*Loads 2d web renderer*/
width: 640, /*game width (adjustable)*/
height: 480, /*game height (adjustable)*/
scene: [ Menu, Play ],
};

/*
Sean Noelle

Allow the player to control the Rocket after it's fired (Rocket Detonation) - 10 points
Display the time remaining (in seconds) on the screen (timer rounded up so that ends on 0) - 15 points
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (Meteor) - 25 points
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) - 25 points
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (Bonus Round, time based on score) - 25 points
Attempted Point total: 100

Thank you for your hard work ^u^
*/

let game = new Phaser.Game(config);/*Loads game*/

//Game difficulty
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 45000
}

let keySPACE, keyLEFT, keyRIGHT, keyUP;