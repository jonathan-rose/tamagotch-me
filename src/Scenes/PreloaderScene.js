import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {
        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // load assets needed in our game
        this.load.image('logo', 'assets/img/logo.png');
        this.load.image('gameBackground', 'assets/img/background.png');
        this.load.image('pet', 'assets/img/pet.png')

        this.load.audio('music', ['assets/audio/Ambler.mp3']);
        this.load.audio('cheep-mid', ['assets/audio/cheep-mid.mp3']);
        this.load.audio('cheep-high', ['assets/audio/cheep-high.mp3']);
        this.load.audio('cheep-low', ['assets/audio/cheep-low.mp3']);
        this.load.audio('die', ['assets/audio/die.mp3']);
        this.load.audio('eat', ['assets/audio/eat.mp3']);
        this.load.audio('flush', ['assets/audio/flush.mp3']);
        this.load.audio('poo1', ['assets/audio/poo1.mp3']);
        this.load.audio('poo2', ['assets/audio/poo2.mp3']);
        this.load.audio('poo3', ['assets/audio/poo3.mp3']);
        this.load.audio('poo-long', ['assets/audio/poo-long.mp3']);

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
    }

    create () {
    }

    init () {
        this.readyCount = 0;
    }

    ready () {
        this.scene.start('Game');
        // this.readyCount++;
        // if (this.readyCount === 20) {
        //     this.scene.start('Credits');
        // }
    }
};
