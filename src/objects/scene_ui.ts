import { textTitleStyle, textBodyStyle } from '../utils/other';

// first param - left & right
// second param - up & down
const PADDING_X = 160;
const PADDING_Y = 25;


export function initSceneUI(scene: Phaser.Scene) {
    
            // add the gameplay sprites
            scene.camera = scene.cameras.main;
            scene.camera.setBackgroundColor(0xff0000);
    
            scene.gameplay_gameUI = scene.add.image(PADDING_X + 90, PADDING_Y + 0, 'gameplay_gameUI');
            scene.gameplay_textarea = scene.add.image(PADDING_X + 0, PADDING_Y + 480, 'gameplay_textarea');


            scene.gameplay_inventory = scene.add.image(PADDING_X + 580, PADDING_Y + 0, 'gameplay_inventory');
            scene.gameplay_map = scene.add.image(PADDING_X + 760, PADDING_Y+ 510, 'gameplay_map');
    
            // align origin
            scene.gameplay_gameUI.setOrigin(0, 0);
            scene.gameplay_inventory.setOrigin(0, 0)
            scene.gameplay_map.setOrigin(0, 0)
            scene.gameplay_textarea.setOrigin(0, 0)
    
}

export function initTextUI(scene: Phaser.Scene) {
      const gameplayTextareaBodyStyles = {
            ...textBodyStyle,
            wordWrap:  { 
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

export function setTextUI(scene: Phaser.Scene, header: String = '', body: String = '') {

    scene.gameplayTextareaHeader.setText(`${header}`);
    scene.gameplayTextareaBody.setText(`${body}`);

}