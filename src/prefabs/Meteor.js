class Meteor extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
     }

    update(){
        //moves left naturally
        this.x += game.settings.spaceshipSpeed*2;
        //wrap around
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

}