class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");/*currently undefined*/
    }
    create(){
        console.log(this);//call log to check loading
        //display message
        this.add.text(20, 20, "Rocket Patrol Menu");
       
        /*launches the next scene*/
        this.scene.start("playScene");
    }
}