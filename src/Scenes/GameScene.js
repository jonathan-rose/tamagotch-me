import 'phaser';
import Util from '../Util';
import Pet from '../Objects/Pet';
import Egg from '../Objects/Egg';

var keys;
var pet;
var egg;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {
        this.config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.petStart = new Phaser.Math.Vector2(this.cameras.main.width/ 2, this.cameras.main.height / 2);

        this.sys.game.globals.startTime = Date.now();

        this.music = this.sound.add('music', { volume: 0.2, loop: true });
        this.sys.game.globals.musicTrack = this.music;
        if (this.model.musicOn === true && this.model.musicPlaying === false) {
            this.music.play();
            this.model.musicPlaying = true;
        }

        keys = this.input.keyboard.addKeys({
            // 'up': Phaser.Input.Keyboard.KeyCodes.UP,
            // 'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.add.image(400, 300, 'gameBackground').setDepth(-2);
        
        // egg = new Egg(this, this.petStart.x, this.petStart.y);
        pet = new Pet(this, this.petStart.x, this.petStart.y, 'pet');
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
    }

    inputHandler () {
        if (keys.left.isDown) {
            pet.moveLeft();
        }

        if (keys.right.isDown) {
            pet.moveRight();
        }

        if (Phaser.Input.Keyboard.JustUp(keys.space)) {
            pet.doPoo();
            this.playPooSound();
        }
    }
}
