import { Scene, GameObjects } from 'phaser';
import { createHighlightableSprite } from '../objects/createHighlightableSprite';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Sprite;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(640, 360, 'background');

        // https://phaser.io/examples/v3/view/input/pixel-perfect/image-with-lots-of-alpha
        // this.logo = this.add.sprite(512, 300, 'logo');


        this.title = this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        
        // LOGO
        this.logo = createHighlightableSprite(this, 512, 300, 'logo');

        this.logo.on('pointerup', () => {
            this.scene.start('Game');
        })
  
    }
}
