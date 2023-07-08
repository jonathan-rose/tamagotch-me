import 'phaser';

export default class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

        // this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }
}