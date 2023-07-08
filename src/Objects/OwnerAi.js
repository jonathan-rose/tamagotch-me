import 'phaser';
import Util from '../Util';

/**
 * Class for controlling Tamagotch-me™ owner actions.
 *
 * Needs to decide when to `feed`, `flush`, etc.
 */
export default class OwnerAi {
    constructor(scene) {
        this.scene = scene;
        this.attemptsSinceLastAction = 0;
        this.attemptsThreshold = 5;
        this.maxPoopAgeThreshold = 2000;
        this.maxFeedThreshold = 10000;

        const config = {
            delay: 1000,
            callback: () => {
                let choice = this.decideAction();
                if (choice == "none") {
                    this.attemptsSinceLastAction++;
                } else {
                    this.attemptsSinceLastAction = 0;
                }
                console.log("performing action: ", choice);
                this.performAction(choice);
            },
            callbackScope: this,
            repeat: -1
        };

        this.timer = new Phaser.Time.TimerEvent(config);
        this.scene.time.addEvent(this.timer);
    }

    /**
     * The main decision making for the human owner.
     *
     * If there's no pressing need, we don't need to do anything
     * until we've gone a while doing nothing.
     *
     * Flushing poops is pretty important, so if we exceed the
     * threshold for totoal poop age we should flush.
     *
     * Feeding is also important, so if we exceed that threshold we'll
     * give the Tamagotch-me™ some food.
     *
     * @TODO: figure out medicine and play conditions once those
     * features are implemented.
     *
     * If there's nothing pressing and we've passed on several
     * consecutive decisions we should randmoly pick between, feed,
     * play or flush if there is at least one poop.
     */
    decideAction() {

        // poops age each frame (roughly 60 per second)
        let poops = this.scene.pet.poops;
        let poopCount = poops.getLength();
        let totalPoopAge = poops
            .children
            .entries
            .map(p => p.age)
            .reduce(Util.sum, 0);

        let timeSinceLastFeed = this.scene.time.now - this.scene.lastFeedTime;
        let timeSinceLastFlush = this.scene.time.now - this.scene.lastFlushTime;

        if (totalPoopAge > this.maxPoopAgeThreshold) {
            return 'flush';
        } else if (timeSinceLastFeed > this.maxFeedThreshold) {
            return 'feed';
        } else if (false) {
            // @TODO: conditions for playing a game
            return 'play';
        } else if (false) {
            // @TODO: conditions for giving medicine
            return 'medicine';
        }
        else {
            // nothing pressing, force an action if it's been a while
            if (this.attemptsSinceLastAction >= this.attemptsThreshold) {
                // you can always feed the pet
                let options = ['feed', 'play'];

                // if there are poops we can flush
                if (poopCount > 0) {
                    options.push('flush');
                }

                return Util.randNth(options);
            }
        }

        return 'none';
    }


    performAction(choice) {
        switch(choice) {
        case 'feed':
            this.scene.feed();
            break;
        case 'flush':
            this.scene.flush();
            break;
        case 'play':
            this.scene.play();
            break;
        case 'medicine':
            this.scene.medicine();
            break;
        }
    }
}
