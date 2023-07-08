import 'phaser';

export default class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'egg');
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.wobbleSpeed = 0.1;
        this.wobbleAngle = 0;

        this.setDepth(0);

        this.setInteractive();
        this.on('pointerdown', this.wobbleEgg, this);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    wobbleEgg () {
        // this.wobbleSpeed += 0.1;

        // const wobbleDirection = Phaser.Math.RND.pick([-1, 1]);

        // var wobbleAngle = wobbleDirection * this.wobbleSpeed;

        this.wobbleDirection = Phaser.Math.RND.pick([-1, 1]);

        this.scene.tweens.add({
            targets: this,
            angle: 45 * this.wobbleDirection,
            duration: 100,
            ease: 'Power0',
            yoyo: true,
            repeat: 0,
        });
    }
}