import 'phaser';
import Poo from '../Objects/Poo';

export default class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.frameRate = 3;
        this.setDepth(0);
        // this.setScale(1);

        this.poos = new Phaser.GameObjects.Group(this.scene);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 0, 1, 2, 3] }),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'wave',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 4, 5, 6, 7] }),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 8, 9, 10, 11] }),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'poop',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 12, 13, 14, 15] }),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.play('idle');

        // this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    moveLeft() {
        this.x -= 5;
        this.flipX = true;
    }
    
    moveRight() {
        this.x += 5;
        this.flipX = false;
    }

    doPoo() {
        let petCurrentPosition = this.getBottomCenter();

        var offsetX = 0;

        switch (this.flipX) {
            case true:
                offsetX = (this.width / 2);
                break;
            case false:
                offsetX = -(this.width / 2);
                break;
        }

        var offsetY = Phaser.Math.Between(-30, 30);

        let newPoo = new Poo(
            this.scene, 
            petCurrentPosition.x + offsetX, 
            petCurrentPosition.y + offsetY);

        let f = Math.random();
        var pooDepth = 0;

        if (f < 0.5) {
            pooDepth = -1;
        } else {
            pooDepth = 1;
        }
        newPoo.depth = pooDepth;

        this.poos.add(newPoo);
    }
}