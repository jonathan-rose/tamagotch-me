import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload () {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('gameBackground', 'assets/background.png')
    }

    create () {
        this.scene.start('Preloader');
    }
};
