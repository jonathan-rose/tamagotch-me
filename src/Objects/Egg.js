import 'phaser';
import Pet from './Pet';

export default class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'egg');
        this.scene = scene;
        this.x = x;
        this.y = y + (this.height / 2);

        this.wobbleINC = 0;
        this.angleBase = (5);
        this.angleMax = (10);

        this.anims.create({
            key: 'crack',
            frames: this.anims.generateFrameNumbers('egg', { frames: [ 0, 1, 2 ] }),
            frameRate: 2,
            repeat: 2,
            hideOnComplete: true,
        });

        this.setDepth(0);
        this.setOrigin(0.5, 1);

        this.setInteractive();
        this.on('pointerdown', this.wobbleEgg, this);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    wobbleEgg () {
        var wobbleAngle = Phaser.Math.Between(this.angleBase, this.angleMax);

        var wobbleDirection = Phaser.Math.RND.pick([-1, 1]);

        this.scene.tweens.add({
            targets: this,
            angle: wobbleAngle * wobbleDirection,
            duration: 100,
            ease: 'Power0',
            yoyo: true,
            repeat: 0,
        });

        this.wobbleINC += 5;

        console.log(this.angleBase, this.angleMax, this.wobbleINC);

        if (this.angleMax < 25) {
            this.angleBase += this.wobbleINC;
            this.angleMax += this.wobbleINC;
        } else {
            this.angleMax = 30;
        }
        

        if (this.wobbleINC >= 70) {
            this.scene.tweens.killTweensOf(this);
            this.play('crack').on('animationcomplete', this.onCrackComplete);
        }
    }

    onCrackComplete () {
        this.scene.setPetVisible();
    }
}