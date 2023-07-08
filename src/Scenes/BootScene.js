import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload () {
        // Use PreloaderScene for assets
    }

    create () {
        this.scene.start('Preloader');
    }
};
