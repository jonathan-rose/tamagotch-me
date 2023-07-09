import 'phaser';
import Util from '../Util';
import Poop from './Poop';

export default class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.frameRate = 3;
        this.setDepth(y + (this.displayHeight / 2));
        this.setScale(0.75);

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
            frameRate: this.frameRate
        });

        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 8, 9, 10, 11] }),
            frameRate: this.frameRate
        });

        this.anims.create({
            key: 'poop',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 12, 13, 14, 15] }),
            frameRate: this.frameRate
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('pet', { frames: [ 16, 17, 18, 19] }),
            frameRate: this.frameRate
        });

        this.play('idle');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    moveLeft() {
        if (this.x - 5 < 120) {
            this.x = 120;
        } else {
            this.x -= 5;
        }
        this.flipX = true;
    }

    moveRight() {
        if (this.x + 5 > (560 - 81)) {
            this.x = (560 - 81);
        } else {
            this.x += 5;
        }
        this.flipX = false;
    }

    /**
     * Orchestrate the timings of poop creation, sound and animations
     */
    doPoop() {
        // do pooping animation

        this.play('poop');
        this.on('animationcomplete', (animation, frame, pet, frameKey) => {pet.play('idle');});

        this.scene.time.delayedCall(500, this.addPoop, null, this);
    }

    /**
     * Add a new poop to the scene.
     */
    addPoop() {
        this.playPoopSound();

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
            Math.max(Math.min(petCurrentPosition.x + offsetX, 495), 100),
            petCurrentPosition.y + offsetY);

        this.poops.add(newPoop);
    }

    /**
     * Play a random poop sound, 1% chance for super long poop
     */
    playPoopSound() {
        let options = [];
        for (var i = 0; i < 33; i++) {
            options.push('poop1');
            options.push('poop2');
            options.push('poop3');
        }
        options.push('poop-long');

        if (this.scene.model.soundOn === true)
        {
            let choice = Util.randNth(options);
            this.scene.sound.play(choice);
        }
    }

    playPlaySound() {
        let options = ['cheep-mid', 'cheep-high', 'cheep-low'];

        if (this.scene.model.soundOn === true)
        {
            let choice = Util.randNth(options);
            this.scene.sound.play(choice);
        }
    }

    doEat() {
        this.play('eat');
        this.on('animationcomplete', (animation, frame, pet, frameKey) => {pet.play('idle');});
    }

    doPlay() {
        this.play('wave');
        this.playPlaySound();
        this.on('animationcomplete', (animation, frame, pet, frameKey) => {pet.play('idle');});
    }

    update() {
        this.poops.children.iterate((p) => {p.update();}, this);
    }
}
