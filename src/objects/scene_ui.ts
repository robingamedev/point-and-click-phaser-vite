import { textTitleStyle, textBodyStyle } from '../utils/other';

// first param - left & right
// second param - up & down
const PADDING_X = 160;
const PADDING_Y = 25;
const GAMEUI_X = PADDING_X + 90;
const GAMEUI_Y = PADDING_Y + 0;
const INVENTORY_X = PADDING_X + 580;
const INVENTORY_Y = PADDING_Y + 0;


interface CustomScene extends Phaser.Scene {
    camera: Phaser.Cameras.Scene2D.Camera;

    // Scene UI
    gameplayGameUIScreen: Phaser.GameObjects.Image;
    gameplayGameUIForeground: Phaser.GameObjects.Image;

    // Inventory
    gameplayInventory: Phaser.GameObjects.Image;

    // 
    gameplayMap: Phaser.GameObjects.Image;

    // Text
    gameplayTextarea: Phaser.GameObjects.Image;
    gameplayTextareaHeader: Phaser.GameObjects.Text;
    gameplayTextareaBody: Phaser.GameObjects.Text;

}


export function getInventoryX() {
    return INVENTORY_X;
}

export function getInventoryY() {
    return INVENTORY_Y;
}

export function initSceneUI(scene: CustomScene) {

    // add the gameplay sprites
    scene.camera = scene.cameras.main;
    scene.camera.setBackgroundColor(0xff0000);

    scene.gameplayGameUIScreen = scene.add.image(GAMEUI_X, GAMEUI_Y, 'gameplay_gameUI');
    scene.gameplayTextarea = scene.add.image(PADDING_X + 0, PADDING_Y + 480, 'gameplay_textarea');


    scene.gameplayInventory = scene.add.image(INVENTORY_X, INVENTORY_Y, 'gameplay_inventory');
    scene.gameplayMap = scene.add.image(PADDING_X + 760, PADDING_Y + 510, 'gameplay_map');

    // align origin
    scene.gameplayGameUIScreen.setOrigin(0, 0);
    scene.gameplayInventory.setOrigin(0, 0)
    scene.gameplayMap.setOrigin(0, 0)
    scene.gameplayTextarea.setOrigin(0, 0)
}

export function initTextUI(scene: CustomScene) {
    const gameplayTextareaBodyStyles = {
        ...textBodyStyle,
        wordWrap: {
            width: 700,
            useAdvancedWrap: true
        },
        align: 'left'
    }

    const title = "potato";
    const msgText = "Precise control over transformations: It allows granular control over how game objects rotate and scale, enabling fine-tuning of their visual behavior.";

    scene.gameplayTextareaHeader = scene.add.text(190, 490, `${title}`, textTitleStyle);

    scene.gameplayTextareaBody = scene.add.text(190, 540, `I change based ${msgText}`, gameplayTextareaBodyStyles);

    scene.gameplayTextareaBody.setOrigin(0);
    scene.gameplayTextareaBody.setScale(1, 1.25);

}



export function setTextUI(scene: CustomScene, header: String = '', body: String = '') {

    scene.gameplayTextareaHeader.setText(`${header}`);
    scene.gameplayTextareaBody.setText(`${body}`);

}

export function initGameImage(scene: CustomScene, image: string, setScale: number = 1) {

    // set gameUI image
    scene.gameplayGameUIForeground = scene.add.image(GAMEUI_X + 5, GAMEUI_Y + 5, image);
    scene.gameplayGameUIForeground.setOrigin(0, 0);
    scene.gameplayGameUIForeground.setScale(setScale);
    // scene.gameplayGameUIForeground.alpha = 0.5;
}

export function replaceGameImage(scene: CustomScene, image: string) {
    scene.gameplayGameUIForeground.setTexture(image);
}