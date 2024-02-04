import { Scene } from 'phaser';
import { createHighlightableSprite } from '../objects/createHighlightableSprite';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    sprite1: Phaser.GameObjects.Sprite;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('logos', 'assets/test-logos-0.png');        
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);


        // Turning logo tiles into sprites
        const tiles = this.textures.get('logos');
        const base = tiles.get();

        Phaser.Textures.Parsers.SpriteSheet(tiles, base.sourceIndex, base.x, base.y, base.width, base.height, {
            frameWidth: 128,
            frameHeight: 128
        });

        const sprite0 = createHighlightableSprite(this, 100, 300, 'logos', 0);
        const sprite1 = createHighlightableSprite(this, 200, 300, 'logos', 1);
        const sprite2 = createHighlightableSprite(this, 300, 300, 'logos', 2);
        const sprite3 = createHighlightableSprite(this, 400, 300, 'logos', 3);
        const sprite4 = createHighlightableSprite(this, 500, 300, 'logos', 4);
        const sprite5 = createHighlightableSprite(this, 600, 300, 'logos', 5);



        this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);




        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
