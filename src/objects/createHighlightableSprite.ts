// TODO: change this function so it allows actions too

export function createHighlightableSprite(scene: Phaser.Scene, x: number, y: number, key: string, frame?: string | number | undefined, borderTint: number = 0xABA9B4): Phaser.GameObjects.Sprite {

    const sprite = scene.add.sprite(x, y, key, frame);
  
    sprite.setInteractive();
  
    sprite.on('pointerover', () => {
      sprite.setTint(borderTint);
    });
  
    sprite.on('pointerout', () => {
      sprite.clearTint();
    });
  
    return sprite;
  }