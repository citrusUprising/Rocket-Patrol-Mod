class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");/*currently undefined*/
    }

    preload(){
        //loads audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //shows menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY-textSpacer,
         'ROCKET PATROL', menuConfig)
        .setOrigin(0.5);
        this.add.text(centerX, centerY,
         'Use ← → arrows to move,', menuConfig)
        .setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer,
            'SPACE to Fire, & ↑ to Detonate', menuConfig)
           .setOrigin(0.5);

       menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000000";
        this.add.text(centerX, centerY + 2*textSpacer,
         'Press for ← Easy or → for Hard', menuConfig)
        .setOrigin(0.5);

        console.log(this);//call log to check loading
        //display message
        //this.add.text(20, 20, "Rocket Patrol Menu");
       
        /*launches the next scene
        this.scene.start("playScene");*/

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 15000 //flag change back to 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}