import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import AboutScene from './Scenes/AboutScene';

import Model from './Model';

class Game extends Phaser.Game {
    constructor () {
        super(config);
        const model = new Model();
        this.globals = { model, bgMusic: null };    
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('About', AboutScene);
        this.scene.add('Game', GameScene);
        this.scene.start('Boot');
    }
}

window.game = new Game();