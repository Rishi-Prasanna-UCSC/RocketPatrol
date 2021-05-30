class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    preload() {

    }

    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
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
        
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000000';

        this.add.text(game.config.width/2,
            game.config.height/2 - 90, 'Use <--> arrows to move \n& (F) to fire',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding - 40,
            '1st balloon: +10pts',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding,
            '2nd balloon: +20pts & +0.5sec',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding + 40,
            '3rd balloon: +30pts & +1sec',
            menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding + 100,
            'High Score: ' + highScore,
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 
            game.config.height/2 + borderUISize + borderPadding + 150,
            'Click anywhere on screen to continue',
            menuConfig).setOrigin(0.5);

        this.input.on("pointerdown", () => {
            this.scene.start("menuScene");
        });
    }
}