import 'phaser';
import Util from '../Util';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create ()
    {
        this.config = this.game.config;
        this.model = this.sys.game.globals.model;

        this.sys.game.globals.startTime = Date.now();

        this.music = this.sound.add('music', { volume: 0.2, loop: true });
        this.sys.game.globals.musicTrack = this.music;
        if (this.model.musicOn === true && this.model.musicPlaying === false) {
            this.music.play();
            this.model.musicPlaying = true;
        }

        this.add.image(400, 300, 'gameBackground');

        this.add.image(400, 300, 'logo');

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

    update ()
    {

    }
}
