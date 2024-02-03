import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background');

        // https://phaser.io/examples/v3/view/input/pixel-perfect/image-with-lots-of-alpha
        this.logo = this.add.sprite(512, 300, 'logo');

        this.title = this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.logo.setInteractive();
        this.logo.on('pointerover', () => {
            this.logo.setTint(0x0000FF);
        });
        this.logo.on('pointerout', () => {
            this.logo.clearTint();
        });

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
