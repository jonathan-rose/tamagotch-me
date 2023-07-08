import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload () {
        this.load.image('logo', 'assets/img/logo.png');
        this.load.image('gameBackground', 'assets/img/background.png');
    }

    create () {
        this.scene.start('Preloader');
    }
};
