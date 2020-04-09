class Play extends Phaser.Scene{
    constructor(){
        super("playScene");/*currently undefined*/
    }
    preload(){
        //loads images and tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
    }

    create(){
        console.log(this); //call log to check loading

        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0,0);

        //white rectangle
        this.add.rectangle(5, 5, 630, 32, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xffffff).setOrigin(0, 0);

        //green rectangle
        this.add.rectangle(37, 42, 566, 64, 0x00ff00).setOrigin(0,0);
    }

    update(){
        //scrolling background
        this.starfield.tilePositionX -= 4;
        //this.starfield.tilePositionY -= 1;
    }
}