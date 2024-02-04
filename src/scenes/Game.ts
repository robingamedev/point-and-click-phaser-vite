import { Scene } from 'phaser';
import { createHighlightableSprite } from '../objects/createHighlightableSprite';
import { setObjectToStore, setArrayToStore, getObjectFromStore, getArrayFromStore, checkIfValueExistsInStore } from '../utils/localStorageTools';
import { initInventory, addInventory } from '../objects/inventory';
import { textTitleStyle, textBodyStyle } from '../utils/other';

interface PlayerData {
    text: string;
    flag: boolean;
    level: number;
};

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    sprite0: Phaser.GameObjects.Sprite;
    sprite1: Phaser.GameObjects.Sprite;
    sprite2a: Phaser.GameObjects.Sprite;
    sprite2b: Phaser.GameObjects.Sprite;
    sprite2c: Phaser.GameObjects.Sprite;
    sprite3: Phaser.GameObjects.Sprite;
    sprite4: Phaser.GameObjects.Sprite;
    sprite5: Phaser.GameObjects.Sprite;
    sprite6: Phaser.GameObjects.Sprite;
    background: Phaser.GameObjects.Image;
    gameplay_gameUI: Phaser.GameObjects.Image;
    gameplay_inventory: Phaser.GameObjects.Image;
    gameplay_map: Phaser.GameObjects.Image;
    gameplay_textarea: Phaser.GameObjects.Image;
    msgText: Phaser.GameObjects.Text;
    sceneText: Phaser.GameObjects.Text;
    inventoryText: Phaser.GameObjects.Text;
    playerInventory: any;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('logos', 'assets/test-logos-0.png');
    }

    setText() {

        const msgTextStyles = {
            ...textBodyStyle,
            wordWrap:  { 
                width: 900, 
                useAdvancedWrap: true  
            },
            align: 'left'
        }

        const extraText = "Precise control over transformations: It allows granular control over how game objects rotate and scale, enabling fine-tuning of their visual behavior. Creative effects: It can be used to achieve unique visual effects and animations by manipulating the origin point.";

        this.msgText = this.add.text(60, 500, `I change based ${extraText}`, msgTextStyles);
        this.msgText.setOrigin(0);

        this.msgText.setScale(1, 1.25);

        this.sceneText = this.add.text(512, 384, 'Click on the 5th one', textTitleStyle);
        this.sceneText.setOrigin(0.5);



    }

    setSprites() {
        // Turning logo tiles into sprites
        const tiles = this.textures.get('logos');
        const base = tiles.get();

        Phaser.Textures.Parsers.SpriteSheet(tiles, base.sourceIndex, base.x, base.y, base.width, base.height, {
            frameWidth: 128,
            frameHeight: 128
        });

        // Sprites
        this.sprite0 = createHighlightableSprite(this, 100, 300, 'logos', 0);
        this.sprite1 = createHighlightableSprite(this, 250, 300, 'logos', 1);
        this.sprite2a = createHighlightableSprite(this, 400, 300, 'logos', 11);
        this.sprite2b = createHighlightableSprite(this, 400, 400, 'logos', 11);
        this.sprite2c = createHighlightableSprite(this, 400, 500, 'logos', 11);
        this.sprite3 = createHighlightableSprite(this, 550, 300, 'logos', 12);
        this.sprite4 = createHighlightableSprite(this, 700, 300, 'logos', 13);
        this.sprite5 = createHighlightableSprite(this, 850, 300, 'logos', 5);
        this.sprite6 = createHighlightableSprite(this, 1000, 300, 'logos', 6);
    }

    setSpriteEvents() {

        // disappear 
        this.sprite0.on('pointerup', () => {
            this.sprite0.destroy();
        })

        // add to text
        this.sprite1.on('pointerup', () => {
            this.msgText.setText('Hello Phaser World');
        })

        // add to inventory 1 - defaults
        this.sprite2a.on('pointerup', () => {

            // Save player data
            const playerData: PlayerData = {
                text: 'this value is saved',
                flag: true,
                level: 10
            };

            setObjectToStore('sprite2', playerData)
            playerData
            this.msgText.setText('Sprite2 is saved');
        })

        // add to inventory 1 - change value to false

        this.sprite2b.on('pointerup', () => {

            setObjectToStore('sprite2', {
                flag: false,
            })

            this.msgText.setText('Sprite2 flag is false');
        })

        // add to inventory 1 - change text to different value
        this.sprite2c.on('pointerup', () => {

            setObjectToStore('sprite2', {
                text: 'this value is now different than the previous one',
            })

            this.msgText.setText('Sprite2 is now different');
        })


        // add to inventory 2
        this.sprite3.on('pointerup', () => {

            // Save player data
            const playerData: PlayerData = {
                text: 'this value is saved',
                flag: false,
                level: 100
            }

            setObjectToStore('sprite3', playerData);

            this.msgText.setText('Sprite3 is saved');
        })

        // add conditonal
        this.sprite4.on('pointerup', () => {
            const doesSprite2Exist = checkIfValueExistsInStore('sprite2');
            const doesSprite3Exist = checkIfValueExistsInStore('sprite3');

            if (!doesSprite2Exist && !doesSprite3Exist) {
                console.log("Sprite 2 or 3 Doesn't exist!")
                this.msgText.setText("Sprite 2 or 3 Doesn't exist");
            }
            if (doesSprite2Exist) {
                this.msgText.setText('Sprite2 Exists');
                // TODO: Use new addToInventory function here
                addInventory(this, { 'Sprite2': 1 });

            }
            if (doesSprite3Exist) {
                this.msgText.setText('Sprite3 Exists');
                addInventory(this, { 'Sprite3': 1 });

            }


        })

        // next level
        this.sprite5.on('pointerup', () => {
            this.scene.start('GameOver');
        })


        // clear local stroage
        this.sprite6.on('pointerup', () => {
            setObjectToStore('sprite2', null);
            setObjectToStore('sprite3', null);
            setObjectToStore('inventory', null);
            this.msgText.setText('clear it out');
        })
    }



    create() {

        this.playerInventory = [];
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);


        this.background = this.add.image(640, 360, 'background');
        this.background.alpha = 0.4;


        // add the gameplay sprites
        this.gameplay_gameUI = this.add.image(30, 20, 'gameplay_gameUI');
        this.gameplay_inventory = this.add.image(950, 30, 'gameplay_inventory');
        this.gameplay_textarea = this.add.image(20, 480, 'gameplay_textarea');
        this.gameplay_map = this.add.image(1050, 530, 'gameplay_map');

        // align origin
        this.gameplay_gameUI.setOrigin(0, 0);
        this.gameplay_inventory.setOrigin(0, 0)
        this.gameplay_map.setOrigin(0, 0)
        this.gameplay_textarea.setOrigin(0, 0)

        // methods
        this.setText();
        this.setSprites();


        initInventory(this);

        this.setSpriteEvents();




        // button.on('pointerdown', () => {
        //     text.setText('Button clicked!');
        //   });




        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }

    update() {

    }
}
