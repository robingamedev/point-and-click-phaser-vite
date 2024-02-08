import { getObjectFromStore, setObjectToStore, checkIfValueExistsInStore } from "../utils/localStorageTools";
import { textTitleStyle } from '../utils/other';

interface CustomScene extends Phaser.Scene {
    playerInventory: { [key: string]: number };
    inventoryText: Phaser.GameObjects.Text;
}


export function initInventory(scene: CustomScene) {

    // 1 - define the scene property
    if (scene.playerInventory === undefined) {
        scene.playerInventory = {};
    }

    // 2 - set it to the store
    if (!checkIfValueExistsInStore('inventory')) {
        setObjectToStore('inventory', null);
    } else {
        scene.playerInventory = getObjectFromStore('inventory');
    }

    // 3 - update the game text
    const inventoryAsText = JSON.stringify(scene.playerInventory);
    scene.inventoryText = scene.add.text(200, 32, inventoryAsText, textTitleStyle)


    // 4 - add buttons
}

export function getInventory(): object | null {
    return getObjectFromStore('inventory');
}

export function addInventory(scene: CustomScene, itemToAdd: { [key: string]: number }) {


    // 1 - update the game object

    // 1a - combining items
    // TODO: fix any so it shows correctly
    const combinedObject: { [key: string]: any } = {};

    for (const key in itemToAdd) {
        if (scene.playerInventory.hasOwnProperty(key)) {
            combinedObject[key] = itemToAdd[key] + scene.playerInventory[key];
        } else {
            combinedObject[key] = itemToAdd[key];
        }
    }

    for (const key in scene.playerInventory) {
        if (!combinedObject.hasOwnProperty(key)) {
            combinedObject[key] = scene.playerInventory[key];
        }
    }

    console.log(combinedObject); // Output: { dog: 3, cat: 1 }

    console.log("addInventory - maininventory", scene.playerInventory)
    console.log("addInventory - combinedObject", combinedObject)

    // 1b - setting it in the scene
    scene.playerInventory = combinedObject;

    // 2 - set it to the store
    setObjectToStore('inventory', combinedObject);

    // 3 - update the screen
    const inventoryAsText = JSON.stringify(scene.playerInventory);
    scene.inventoryText.setText(inventoryAsText);

}
