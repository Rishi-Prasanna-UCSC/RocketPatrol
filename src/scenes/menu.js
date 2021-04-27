class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/Pop.mp3');
        this.load.audio('sfx_rocket', './assets/Throw.wav');
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Menu");
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#008F00',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            }, 
            fixedWidth: 0
        }
        this.add.text(game.config.width/2,
            game.config.height/2 - borderUISize - borderPadding,
            'BALLOON PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2,
            game.config.height/2, 'Use <--> arrows to move & (F) to fire',
            menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000000';
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding,
            'Press <- for Novice or -> for Expert',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding + 40,
            '1st ship: +10pts',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding + 80,
            '2nd ship: +20pts & +0.5sec',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding + 120,
            '3rd ship: +30pts & +1sec',
            menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //this.scene.start("playScene");
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}
