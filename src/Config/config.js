import 'phaser';

export default {
    type: Phaser.WEBGL,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};
