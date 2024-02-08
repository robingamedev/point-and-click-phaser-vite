import { Scene } from 'phaser';
import { createHighlightableSprite } from '../objects/createHighlightableSprite';
import { setObjectToStore, setArrayToStore, getObjectFromStore, getArrayFromStore, checkIfValueExistsInStore } from '../utils/localStorageTools';
import { initInventory, addInventory } from '../objects/inventory';
import { textTitleStyle } from '../utils/other';
import { initSceneUI, initTextUI, initGameImage, setTextUI, replaceGameImage } from '../objects/scene_ui';

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
    sprite3a: Phaser.GameObjects.Sprite;
    sprite3b: Phaser.GameObjects.Sprite;
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
        this.load.image('castle', 'assets/scene/bard_castle4.jpeg');
        this.load.image('battlefield', 'assets/scene/bard_battlefield2.jpeg');
    }

    setText() {

        initTextUI(this);

        // seprate thing
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
        this.sprite0 = createHighlightableSprite(this, 50, 50, 'logos', 0);
        this.sprite1 = createHighlightableSprite(this, 50, 150, 'logos', 1);
        this.sprite2a = createHighlightableSprite(this, 50, 250, 'logos', 11);
        this.sprite2b = createHighlightableSprite(this, 150, 250, 'logos', 11);
        this.sprite2c = createHighlightableSprite(this, 250, 250, 'logos', 11);
        this.sprite3a = createHighlightableSprite(this, 50, 350, 'logos', 12);
        this.sprite3b = createHighlightableSprite(this, 150, 350, 'logos', 12);
        this.sprite4 = createHighlightableSprite(this, 50, 450, 'logos', 13);
        this.sprite5 = createHighlightableSprite(this, 50, 550, 'logos', 5);
        this.sprite6 = createHighlightableSprite(this, 50, 650, 'logos', 6);
    }

    setSpriteEvents() {

        // disappear 
        this.sprite0.on('pointerup', () => {
            this.sprite0.destroy();
            replaceGameImage(this, 'battlefield');
        })

        // add to text
        this.sprite1.on('pointerup', () => {
            setTextUI(this, 'Narrator', 'Hello Phaser World');
            // this.msgText.setText('Hello Phaser World');
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
            setTextUI(this, 'Narrator', 'Sprite2 is saved');
        })

        // add to inventory 1 - change value to false

        this.sprite2b.on('pointerup', () => {

            setObjectToStore('sprite2', {
                flag: false,
            })

            setTextUI(this, 'Narrator', 'Sprite2 flag is false');
        })

        // add to inventory 1 - change text to different value
        this.sprite2c.on('pointerup', () => {

            setObjectToStore('sprite2', {
                text: 'this value is now different than the previous one',
            })

            setTextUI(this, 'Narrator', 'Sprite2 is now different');
        })


        // add to inventory 2
        this.sprite3a.on('pointerup', () => {

            const playerData: PlayerData = {
                text: 'this value is saved',
                flag: false,
                level: 100
            }

            setObjectToStore('sprite3', playerData);

            setTextUI(this, 'Narrator', 'Sprite3 is saved');
        })

        this.sprite3b.on('pointerup', () => {

            addInventory(this, {'thing1': 1});
            addInventory(this, {'thing2': 2});
            addInventory(this, {'thing3': 3});
            addInventory(this, {'thing4': 4});
            addInventory(this, {'thing5': 5});
            addInventory(this, {'thing6': 6});
            addInventory(this, {'thing7': 7});
            addInventory(this, {'thing8': 8});
            addInventory(this, {'thing9': 9});
            addInventory(this, {'thing10': 10});

            setTextUI(this, 'Narrator', 'Added all the things to the inventory');
        })


        // add conditonal
        this.sprite4.on('pointerup', () => {
            const doesSprite2Exist = checkIfValueExistsInStore('sprite2');
            const doesSprite3Exist = checkIfValueExistsInStore('sprite3');

            if (!doesSprite2Exist && !doesSprite3Exist) {
                console.log("Sprite 2 or 3 Doesn't exist!")
                setTextUI(this, 'Narrator', "Sprite 2 or 3 Doesn't exist");
            }
            if (doesSprite2Exist) {
                setTextUI(this, 'Narrator', 'Sprite2 Exists');
                addInventory(this, { 'Sprite2': 1 });
            }
            
            if (doesSprite3Exist) {
                setTextUI(this, 'Narrator', 'Sprite3 Exists');
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
            setTextUI(this, 'Narrator', 'clear it out');
        })
    }



    create() {

        this.playerInventory = [];

        this.background = this.add.image(640, 360, 'background');
        this.background.alpha = 0.4;


        // normal init
        initSceneUI(this);
  
        initGameImage(this, 'castle', 0.30);

        // methods
        this.setText(); // set text

        // inventory
        initInventory(this);


        this.setSprites();
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
