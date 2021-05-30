class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.highScore = 0;
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', 'assets/Dart.png');
        this.load.image('balloon', 'assets/balloon.png');
        this.load.image('bluesky', 'assets/bluesky.png');
        // load spritesheet
        this.load.image('pop', 'assets/balloondam.png');
    }

    create() {
        // place tile sprite
        this.bluesky = this.add.tileSprite(0, 0, 640, 480, 'bluesky').setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'balloon', 0, 30);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'balloon', 0, 20);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'balloon', 0, 10);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        this.anims.create({
            key: 'explode',
            //frames: this.anims.generateFrameNumbers('pop', { start: 0, end: 6, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        let descConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: '#008f00',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 2,
                bottom: 2,
            }
        }

        // display score
        let scoreConfig = {
            fontFamily: 'Laca',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        // initialize timer
        this.startTime = this.time.now;
        this.timer = 60;
        // display timer
        let timerConfig = {
            fontFamily: 'Laca',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 80
        }

        
        this.scoreLeft = this.add.text(50, 50, this.p1Score, scoreConfig);
        this.scoreLeftDesc = this.add.text(50, 30, 'Score', descConfig);

        this.highScoreMiddle = this.add.text(270, 50, highScore, scoreConfig);
        this.highScoreDesc = this.add.text(270, 30, 'High Score', descConfig);

        this.timerRight = this.add.text(490, 50, this.timer, timerConfig);
        this.timerRightDesc = this.add.text(490, 30, 'Time', descConfig);

        // GAME OVER flag
        this.gameOver = false; 

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        timerConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(this.timer * 1000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        this.bluesky.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            if (this.timerRight.text > 0) {
                this.timerRight.text = Math.floor(this.timer - ((this.time.now - this.startTime)/1000));
            }
            else {
                this.timerRight.text = 0;
            }
        }
        else {
            this.timerRight.text = 0;
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.timer += 0.5;
            this.clock.delay += 500;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.timer += 1;
            this.clock.delay += 1000;
        }
        if (this.p1Score > highScore) {
            highScore = this.p1Score;
            this.highScoreMiddle.text = this.p1Score;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.setTexture('pop');

        // Animation for falling.
        let anim = this.tweens.add({
            angle: -45,
            y: "+= 25",
            alpha: 0,
            duration: 300,
            targets: [ship]
        });
        anim.on('complete', () => {
            // callback after ani completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            ship.angle = 0;
            ship.setTexture('balloon');
            ship.y -= 25;
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion'); 
    }
}