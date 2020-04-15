class Play extends Phaser.Scene{
    constructor(){
        super("playScene");/*currently undefined*/
    }

    preload(){
        //loads images and tile sprites
        this.load.image('rocket', "./assets/rocketC.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("meteor", "./assets/meteor.png"); 
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
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

        this.ship01 = new Spaceship(this, game.config.width, 132, `spaceship`, 0, 30)
        .setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width +96, 232, `spaceship`, 0, 20)
        .setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + 192, 332, `spaceship`, 0, 10)
        .setOrigin(0,0);

        this.meteor01 = new Meteor(this, -300, 100, `meteor`, 0, 100)
        .setOrigin(0,0);

        //Controls initiation
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //Config animation
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers
            ("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score initial
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text
        (69, 54, this.p1Score, scoreConfig);

        //sets up timer
        this.scoreRight = this.add.text
        (game.config.width-scoreConfig.fixedWidth-69, 54, this.clock, scoreConfig);//flag

        //set game over check
        this.gameOver = false;

        //Play Clock 60 seconds
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
            'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 
            'Hit Space to Restart or ← for Menu', scoreConfig).setOrigin(0.5); 
            this.gameOver = true;
            console.log(this.gameOver);
        }, null, this);
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.restart(this.p1Score);
        }   
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }  
        //scrolling background
        this.starfield.tilePositionX -= 4;
        //this.starfield.tilePositionY -= 1;
       if (!this.gameOver){
        this.p1rocket.update(); //updates rocket
       this.ship01.update(); //updates ships
       this.ship02.update();
       this.ship03.update();
       this.meteor01.update();
       }

       //check collisions and detonations
       if(this.checkCollision(this.p1rocket, this.ship03)){
            this.p1rocket.reset();
            this.shipExplode(this.ship03);
       }
       if(this.checkCollision(this.p1rocket, this.ship02)){
            this.p1rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1rocket, this.ship01)){
            this.p1rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1rocket, this.meteor01)){
            this.p1rocket.reset();
            this.shipExplode(this.meteor01);
        }

        //flag
        /* if(this.checkExplosion(this.detonation, this.ship03)){
            this.shipExplode(this.ship03);
       }
       if(this.checkExplosion(this.detonation, this.ship02)){
            this.shipExplode(this.ship02);
        }
        if(this.checkExplosion(this.detonation, this.ship01)){
            this.shipExplode(this.ship01);
        }
        if(this.checkExplosion(this.detonation, this.meteor01)){
            this.shipExplode(this.meteor01);
        }
        */
    }
    checkCollision(rocket, ship){
        //AABB Setup and check
        if(rocket.x < ship.x + ship.width &&
        rocket.x + rocket.width > ship.x &&
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship.y){
            return true;     
        } else {
          return false;
        }
    }

    //flag
    /* checkExplosion(detonate, ship){
        //AABB Setup and check
        if(detonate.x < ship.x + ship.width &&
        detonate.x + detonate.width > ship.x &&
        detonate.y < ship.y + ship.height &&
        detonate.height + detonate.y > ship.y){
            return true;     
        } else {
          return false;
        }
    }*/

    shipExplode(ship) {  
        ship.alpha = 0; //makes ship invisible

        //create explosion sprite at sheet positions
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //plays explosion
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });//flag copy for detonation

        //score increment and update
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); //plays explosion effect
    }
}