import 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create ()
    {
        this.config = this.game.config;

        this.sys.game.globals.startTime = Date.now();

        this.add.image(400, 300, 'gameBackground');

        this.add.image(400, 300, 'logo');

    }

    update ()
    {

    }
}
