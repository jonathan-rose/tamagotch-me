import 'phaser';

export default class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.frameRate = 3;
        // this.setScale(1);

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
}