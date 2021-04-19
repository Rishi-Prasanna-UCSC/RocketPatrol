class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = 3;
    }

    update() {
        // Move spaceship left.
        this.x -= this.moveSpeed;
        // wrap from left edge to right edge.
        if (this.x <= 0 - this.width) {
            this.x.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}