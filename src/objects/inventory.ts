import { getObjectFromStore, setObjectToStore, checkIfValueExistsInStore } from "../utils/localStorageTools";
import { textStyle } from '../utils/other';


export function initInventory(scene: Phaser.Scene) {

    // 1 - define the scene property
    if (scene.playerInventory === undefined) {
        scene.playerInventory = [];
    }

    // 2 - set it to the store
    if (!checkIfValueExistsInStore('inventory')) {
        setObjectToStore('inventory', null);
    }

    // 3 - update the game text
    scene.inventoryText = scene.add.text(512, 500, 'inventory', textStyle)

}

export function getInventory(): object | null {
    return getObjectFromStore('inventory');
}

export function addInventory(scene: Phaser.Scene, itemToAdd: object) {


    // 1 - update the game object
   
    // 1a - combining items
    const combinedObject = {};

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
    scene.inventoryText.setText(JSON.stringify(scene.playerInventory));

}
