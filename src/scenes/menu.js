class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/Pop.mp3');
        this.load.audio('sfx_rocket', './assets/Throw.wav');
        this.load.image('BG', 'assets/BalloonPatrolScreen.png');

        // load music - I composed this myself
        this.load.audio('Music', 'assets/RocketPatrolModMusic.wav');

        this.load.image('Easy', 'assets/EasyButton.png');
        this.load.image('Hard', 'assets/HardButton.png');
        this.load.image('Instr', 'assets/InstructionsButton.png');
    }

    create() {
        this.add.image(320, 240, 'BG');

        let music;
        if (!musicPlaying) {
            music = this.sound.add('Music');
            music.setLoop(true);
            music.play();
            musicPlaying = true;
        }

        let e = this.add.image(500, 135, 'Easy');
        let h = this.add.image(500, 235, 'Hard');
        let i = this.add.image(500, 335, 'Instr');
        e.setScale(1.3);
        h.setScale(1.3);
        i.setScale(1.3);

        e.setInteractive();
        h.setInteractive();
        i.setInteractive();

        e.on('pointerdown', () => {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');   
        });
        h.on('pointerdown', () => {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        });
        i.on('pointerdown', () => {
            this.scene.start("instructionsScene");
        });
    }
    update() {
        /*
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          
        }
        */
    }
}
