import 'phaser';
import Poop from './Poop';

export default class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.frameRate = 3;
        this.setDepth(1);
        // this.setScale(1);

        this.poops = new Phaser.GameObjects.Group(this.scene);

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

    doPoop() {
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

        let newPoop = new Poop(
            this.scene, 
            petCurrentPosition.x + offsetX, 
            petCurrentPosition.y + offsetY);

        let f = Math.random();
        var poopDepth = 0;

        if (f < 0.5) {
            poopDepth = 0;
        } else {
            poopDepth = 2;
        }
        newPoop.depth = poopDepth;

        this.poops.add(newPoop);
    }
}