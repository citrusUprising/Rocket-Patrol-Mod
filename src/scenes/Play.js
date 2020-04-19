class Play extends Phaser.Scene{
    constructor(){
        super("playScene");/*currently undefined*/
    }

    preload(){
        //loads images and tile sprites
        this.load.image('rocket', "./assets/rocketC.png");
        this.load.image("spaceship", "./assets/spaceshipC.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("meteor", "./assets/meteorD.png"); 
        this.load.spritesheet('explosion', './assets/explosionA.png', 
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

        this.detonation = new Detonation(this, -100, -100, 'explosion', 0).setOrigin(0,0); //sets up detonation hitbox off screen
        this.detonation.setActive(false).setVisible(false); //explosion sprite

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

       

        //set game over check
        this.gameOver = false;
        //this.uptick = 0; //flag

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

             //sets up timer
             this.stopWatch = game.settings.gameTimer;
             this.stopWatchDisplay = this.stopWatch/1000;
             this.scoreRight = this.add.text
             (game.config.width-scoreConfig.fixedWidth-75, 54, this.stopWatchDisplay, scoreConfig);
    
    }

    update(){

        this.stopWatch = game.settings.gameTimer-this.clock.getElapsed();
        this.stopWatchDisplay = Math.trunc((this.stopWatch+999)/1000);
        this.scoreRight.setText(this.stopWatchDisplay);

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
       this.detonation.update();
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

        if(this.p1rocket.detonate == true){
            this.rocketDetonate(this.p1rocket, this.detonation);
        }

        //runs checks for rocket detonation touching ships
        if(this.checkExplosion(this.detonation, this.ship03)){
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

    //overlap check for detonation and ships
     checkExplosion(detonation, ship){
        //AABB Setup and check
        if(detonation.x < ship.x + ship.width &&
        detonation.x + detonation.width > ship.x &&
        detonation.y < ship.y + ship.height &&
        detonation.height + detonation.y > ship.y){
            return true;     
        } else {
          return false;
        }
    }

    //spawns explosion and moves detonation to rocket
    rocketDetonate(rocket, detonation){
        let targetX = rocket.x-16;
        let targetY = rocket.y-16;
        rocket.reset();
        detonation.setActive(true);
        detonation.x = targetX;
        detonation.y = targetY;
        let boom = this.add.sprite(targetX, targetY, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //plays explosion
        boom.on('animationcomplete', () => {
            detonation.x = -100;
            detonation.y = -100;
            detonation.setActive(false);
            boom.destroy();
        });
    }

    shipExplode(ship) {  
        ship.alpha = 0; //makes ship invisible
        let target = ship.x;
        //console.log(target);
        ship.reset();

        //create explosion sprite at sheet positions
        let boom = this.add.sprite(target, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //plays explosion
        boom.on('animationcomplete', () => {
            ship.alpha = 1;
            target = 0;
            boom.destroy();
        });

        //score increment and update
        this.p1Score += ship.points;
        //this.uptick += ship.points*10; //flag
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); //plays explosion effect
    }
}