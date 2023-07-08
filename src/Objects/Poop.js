import 'phaser';

export default class Poo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'poop');
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.setOrigin(0.5, 1);
        this.setDepth(0);

        this.scene.add.existing(this);
    }
}