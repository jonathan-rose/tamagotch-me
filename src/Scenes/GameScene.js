import 'phaser';
import Util from '../Util';
import Pet from '../Objects/Pet';
import Egg from '../Objects/Egg';
import OwnerAi from '../Objects/OwnerAi.js';

var keys;
var egg;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {
        this.config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.petStart = new Phaser.Math.Vector2(this.cameras.main.width/ 2, this.cameras.main.height / 2);

        this.sys.game.globals.startTime = this.time.now;
        this.lastFeedTime = this.time.now;
        this.lastFlushTime = this.time.now;
        this.lastPlayTime = this.time.now;
        this.lastMedicineTime = this.time.now;

        this.music = this.sound.add('music', { volume: 0.2, loop: true });
        this.sys.game.globals.musicTrack = this.music;
        if (this.model.musicOn === true && this.model.musicPlaying === false) {
            this.music.play();
            this.model.musicPlaying = true;
        }

        this.owner = new OwnerAi(this);

        keys = this.input.keyboard.addKeys({
            // 'up': Phaser.Input.Keyboard.KeyCodes.UP,
            // 'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.add.image(300, 300, 'gameBackground');

        // egg = new Egg(this, this.petStart.x, this.petStart.y);
        this.pet = new Pet(this, this.petStart.x, this.petStart.y, 'pet');

        this.border = this.add.image(300, 300, 'border6');
        this.border.depth = 100;
        this.border.scale = 0.75;

        this.foodIcon = this.add.image(150, 460, 'foodIconGrey');
        this.playIcon = this.add.image(250, 460, 'playIconGrey');
        this.flushIcon = this.add.image(350, 460, 'flushIconGrey');
        this.medicineIcon = this.add.image(450, 460, 'medicineIconGrey');
    }

    /**
     * Play a random poo sound, 1% chance for super long poo
     */
    playPooSound() {
        let options = [];
        for (var i = 0; i < 33; i++) {
            options.push('poo1');
            options.push('poo2');
            options.push('poo3');
        }
        options.push('poo-long');

        if (this.model.soundOn === true)
        {
            let choice = Util.randNth(options);
            this.sound.play(choice);
        }
    }

    update () {
        this.inputHandler();
        this.pet.update();
    }

    inputHandler () {
        if (keys.left.isDown) {
            this.pet.moveLeft();
        }

        if (keys.right.isDown) {
            this.pet.moveRight();
        }

        if (Phaser.Input.Keyboard.JustUp(keys.space)) {
            this.pet.doPoop();
            this.playPooSound();
        }
    }

    /**
     * Add some food to the play area.
     */
    feed() {
        this.lastFeedTime = this.time.now;
        // @TODO: implement me
        console.log("FEEDING PET");
    }

    /**
     * Remove all poos from the play area.
     */
    flush() {
        this.lastFlushTime = this.time.now;

        this.flushWipe = this.add.sprite(450, 300, 'flushWipe');
        this.physics.add.existing(this.flushWipe);
        this.physics.add.collider(this.flushWipe, this.pet.poops, this.removePoop, null, this);

        this.tweens.add({
            targets: this.flushWipe,
            x: "-=400",
            onComplete: () => {
                this.flushWipe.destroy();
            }
        });

        if (this.model.soundOn === true)
        {
            this.sound.play('flush');
        }

        this.flushIcon.setTexture('flushIconBlack');
        this.time.delayedCall(800, () => {
            this.flushIcon.setTexture('flushIconGrey')
        }, null, this);
    }

    removePoop(wave, poop) {
        poop.destroy();
    }

    /**
     * Play a game with the Tamagotch-me™.
     *
     * #stretchgoals
     */
    play() {
        this.lastPlayTime = this.time.now;
        // @TODO: implement me
        console.log("PLAYING GAME");
    }

    /**
     * Give the Tamagotch-me™ medicine.
     *
     * #stretchgoals
     */
    medicine() {
        this.lastMedicineTime = this.time.now;
        // @TODO: implement me
        console.log("MEDICINE");
    }
}
