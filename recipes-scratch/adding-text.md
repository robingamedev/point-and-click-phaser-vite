
```js
// Create a text object and center it on the screen
const text = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Hello', {
  font: '64px Arial',
  fill: '#FFFFFF' // White text
});

// Function to change the text content
function updateText(newText) {
  text.setText(newText);
}

// Example usage: Change the text after 2 seconds
this.time.addEvent({
  delay: 2000,
  callback: () => {
    updateText('New message!');
  }
});
```

## Loading json

https://phaser.io/examples/v3/view/cache/json-file


## Text Button
https://labs.phaser.io/edit.html?src=src/game%20objects\text\simple%20text%20button.js
