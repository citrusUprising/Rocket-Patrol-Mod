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
        
        //add Rocket p1
        this.p1rocket = new Rocket(this, game.config.width/2, 431, `rocket`)
        .setScale(0.5, 0.5)
        .setOrigin(0,0);

        this.ship01 = new Spaceship(this, game.config.width +192, 132, `spaceship`, 0, 30)
        .setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width +96, 232, `spaceship`, 0, 20)
        .setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 332, `spaceship`, 0, 10)
        .setOrigin(0,0);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //scrolling background
        this.starfield.tilePositionX -= 4;
       // this.starfield.tilePositionY -= 1;
       this.p1rocket.update(); //updates rocket
       this.ship01.update();
       this.ship02.update();
       this.ship03.update();
    }
}