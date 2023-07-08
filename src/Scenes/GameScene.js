import 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create ()
    {
        this.config = this.game.config;
        this.model = this.sys.game.globals.model;

        this.sys.game.globals.startTime = Date.now();

        this.music = this.sound.add('music', { volume: 0.3, loop: true });
        this.sys.game.globals.musicTrack = this.music;
        if (this.model.musicOn === true && this.model.musicPlaying === false) {
            this.music.play();
            this.model.musicPlaying = true;
        }

        this.add.image(400, 300, 'gameBackground');

        this.add.image(400, 300, 'logo');

    }

    update ()
    {

    }
}
