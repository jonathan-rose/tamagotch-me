import 'phaser';

export default class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'egg');
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.setDepth(0);

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    shakeEgg() {

    }
}