class Meteor extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        
        //add object to existing scene
        scene.add.existing(this);
        this.points = pointValue;
     }

    update(){
        //moves right naturally
        this.x += game.settings.spaceshipSpeed*2;
        //wrap around
        if(this.x >= game.config.width + this.width){
            this.x = 0-this.width;
        }
    }

}