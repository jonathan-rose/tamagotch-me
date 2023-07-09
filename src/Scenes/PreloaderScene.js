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
        this.load.image('poop', 'assets/img/poop.png');
        this.load.image('food', 'assets/img/food.png');
        this.load.image('ball', 'assets/img/ball.png');
        this.load.image('egg', 'assets/img/egg.png');
        this.load.spritesheet('pet', 'assets/img/petSpritesheet-big.png', {frameWidth: 192, frameHeight: 192});

        this.load.image('border1', 'assets/img/border-005200-bce784.png');
        this.load.image('border2', 'assets/img/border-0eb1d2-dad2d8.png');
        this.load.image('border3', 'assets/img/border-3b429f-00e8fc.png');
        this.load.image('border4', 'assets/img/border-f03a47-7a306c.png');
        this.load.image('border5', 'assets/img/border-fc7a57-f6f7eb.png');
        this.load.image('border6', 'assets/img/border-52b752-f6db3c.png');

        this.load.image('foodIconBlack', 'assets/img/foodIcon.png');
        this.load.image('foodIconGrey', 'assets/img/foodIconGreyedOut.png');
        this.load.image('playIconBlack', 'assets/img/playIcon.png');
        this.load.image('playIconGrey', 'assets/img/playIconGreyedOut.png');
        this.load.image('flushIconBlack', 'assets/img/duckIcon.png');
        this.load.image('flushIconGrey', 'assets/img/duckIconGreyedOut.png');
        this.load.image('medicineIconBlack', 'assets/img/medicineIcon.png');
        this.load.image('medicineIconGrey', 'assets/img/medicineIconGreyedOut.png');

        this.load.image('flushWipe', 'assets/img/flushWipe.png');

        this.load.audio('music', ['assets/audio/Ambler.mp3']);
        this.load.audio('cheep-mid', ['assets/audio/cheep-mid.mp3']);
        this.load.audio('cheep-high', ['assets/audio/cheep-high.mp3']);
        this.load.audio('cheep-low', ['assets/audio/cheep-low.mp3']);
        this.load.audio('die', ['assets/audio/die.mp3']);
        this.load.audio('eat', ['assets/audio/eat.mp3']);
        this.load.audio('flush', ['assets/audio/flush.mp3']);
        this.load.audio('poop1', ['assets/audio/poop1.mp3']);
        this.load.audio('poop2', ['assets/audio/poop2.mp3']);
        this.load.audio('poop3', ['assets/audio/poop3.mp3']);
        this.load.audio('poop-long', ['assets/audio/poop-long.mp3']);

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
