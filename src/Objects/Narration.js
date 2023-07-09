import 'phaser';
import Util from '../Util';

export default class Narration extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = new Phaser.GameObjects.Image(this.scene, 0, 0, 'narration');

        this.setAlpha(0);

        this.messageIndex = 0;
        this.messages = [
            "An excited 10 year old stares down at you, so full of joy and potential.",
            "A day out at the zoo, but they brought you along. Can't leave your new friend behind.",
            "Snippets of a history lesson drift through the open pocket you hide in. Time for a quick game?",
            "A summer spent at camp. Together.",
            "A playdate at a friends house. Their Tamagotch-me™ is blue.",
            "A day at the park. But this time you stay home. That's ok, it's safer at home.",
            "A Family holiday. Mum says Tamagotch-me™ aren't allowed.",
            "Another playdate, but where is their Tamagotch-me™?",
            "A weekend stuck down the back of the car seat. Not forgotten, no, surely not.",
            "A summer spent at camp. Apart. Alone.",
            "Months of solitude. Contemplation. Emptiness."
        ];
        this.finalMessage = "Finally acceptance. Forgotten and alone, you see in the new millenium.";

        this.onScreenTime = 8000;
        this.betweenTime = 13000;
        this.maxAlpha = 0.85;

        this.text = new Phaser.GameObjects.Text(
            this.scene,
            0,
            0,
            this.text,
            {
                align: 'left',
                fontSize: '24px',
                wordWrap: {
                    width: 420,
                    useAdvancedWrap: true
                },
                fill: '#000'
            }
        ).setOrigin(0.5);

        this.add(this.texture);
        this.add(this.text);

        const config = {
            delay: this.betweenTime,
            startAt: 10000,
            callback: this.nextMessage,
            callbackScope: this,
            repeat: this.messages.length - 1
        };

        this.timer = new Phaser.Time.TimerEvent(config);

        // display above border
        this.depth = 999999999;
    }

    begin() {
        this.scene.time.addEvent(this.timer);

        // add final message
        this.scene.time.delayedCall(
            this.betweenTime * (this.messages.length + 1),
            this.showFinalMessage,
            null,
            this
        );
    }

    nextMessage() {
        this.text.text = this.messages[this.messageIndex];
        this.scene.tweens.add({
            targets: this,
            alpha: this.maxAlpha,
            duration: 300
        });

        this.scene.time.delayedCall(this.onScreenTime, () => {
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 300
            });
        }, null, this);

        this.messageIndex++;
        this.scene.progress++;
    }

    showFinalMessage() {
        this.text.text = this.finalMessage;
        this.scene.tweens.add({
            targets: this,
            alpha: this.maxAlpha,
            duration: 300
        });
    }
}
