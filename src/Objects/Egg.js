import 'phaser';

export default class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'egg');
        this.scene = scene;
        this.x = x;
        this.y = y + (this.height / 2);

        this.initX = x;
        this.wobbleClickCount = 0;
        this.hatchStart = true;

        this.anims.create({
            key: 'crack',
            frames: this.anims.generateFrameNumbers('egg', { frames: [ 0, 1, 2 ] }),
            frameRate: 2,
            hideOnComplete: true,
        });

        this.setDepth(0);
        this.setOrigin(0.5, 1);

        this.createWobbleTimer();

        this.setInteractive();
        this.on('pointerdown', function () {
            this.wobbleEgg();
            this.clickEgg();
        }, this);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);

    }

    createWobbleTimer () {
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: function () { this.wobbleEgg(); },
            callbackScope: this,
            repeat: -1,
            loop: true
        });
    }

    wobbleEgg () {
        if (this.hatchStart == true) {
            this.wobbleClickCount += 1;
        }

        const wobbleDuration = 250;
        const wobbleMagnitude = 10;

        var wobbleDirection = Phaser.Math.RND.pick([-1, 1]);

        this.scene.tweens.add({
            targets: this,
            x: this.x - (wobbleMagnitude * wobbleDirection),
            duration: wobbleDuration / 2,
            yoyo: true,
            repeat: 0,
            onComplete: () => {
                this.x = this.initX;
            }
        });

        this.checkClicks();
    }

    clickEgg () {
        if (this.hatchStart == false) {
            this.hatchStart = true;
            // this.scene.sound.play('battery');
        }

        this.wobbleClickCount += 1;
    }

    checkClicks () {
        if (this.wobbleClickCount >= 10) {
            this.disableInteractive();
            this.timer.reset();
            this.scene.tweens.killTweensOf(this);
            this.scene.sound.play('hatch');
            this.play('crack').on('animationcomplete', this.onCrackComplete);
        }
    }

    onCrackComplete () {
        this.scene.setPetVisible();
    }
}
