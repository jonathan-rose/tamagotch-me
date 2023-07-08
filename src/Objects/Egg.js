import 'phaser';

export default class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'egg');
        this.scene = scene;
        this.x = x;
        this.y = y + (this.height / 2);

        this.initX = x;

        // this.wobbleINC = 0;
        // this.angleBase = (5);
        // this.angleMax = (10);

        this.wobbleClickCount = 0;

        this.anims.create({
            key: 'crack',
            frames: this.anims.generateFrameNumbers('egg', { frames: [ 0, 1, 2 ] }),
            frameRate: 2,
            repeat: 1,
            hideOnComplete: true,
        });

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.wobbleEgg(),
            callbackScope: this,
            repeat: -1,
            // loop: true
            }
        )
S
        this.setDepth(0);
        this.setOrigin(0.5, 1);

        this.setInteractive();
        this.on('pointerdown', this.wobbleEgg, this);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    wobbleEgg () {
        const wobbleDuration = 250;
        const wobbleMagnitude = 10;

        var wobbleDirection = Phaser.Math.RND.pick([-1, 1]);

        this.scene.tweens.add({
            targets: this,
            x: this.x - (wobbleMagnitude * wobbleDirection),
            duration: wobbleDuration / 2,
            // ease: 'Bounce.In',
            yoyo: true,
            repeat: 0,
            onComplete: () => {
                this.x = this.initX;
            }
        });

        this.wobbleClickCount += 1;

        console.log(this.wobbleClickCount);
        console.log(this.timer);
        
        if (this.wobbleClickCount >= 10) {
            this.scene.tweens.killTweensOf(this);
            this.play('crack').on('animationcomplete', this.onCrackComplete);
        }
        
    }

    // wobbleEgg () {
    //     var wobbleAngle = Phaser.Math.Between(this.angleBase, this.angleMax);

    //     var wobbleDirection = Phaser.Math.RND.pick([-1, 1]);

    //     this.scene.tweens.add({
    //         targets: this,
    //         angle: wobbleAngle * wobbleDirection,
    //         duration: 100,
    //         ease: 'Power0',
    //         yoyo: true,
    //         repeat: 0,
    //     });

    //     this.wobbleINC += 5;

    //     console.log(this.angleBase, this.angleMax, this.wobbleINC);

    //     if (this.angleMax < 25) {
    //         this.angleBase += this.wobbleINC;
    //         this.angleMax += this.wobbleINC;
    //     } else {
    //         this.angleMax = 30;
    //     }
        

    //     if (this.wobbleINC >= 70) {
    //         this.scene.tweens.killTweensOf(this);
    //         this.play('crack').on('animationcomplete', this.onCrackComplete);
    //     }
    // }

    onCrackComplete () {
        this.scene.setPetVisible();
    }
}