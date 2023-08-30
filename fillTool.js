function FillTool() {
  this.name = "fillTool";
  this.icon = "fa-solid fa-bucket";
  this.title = "Fill Tool";

  this.draw = function () {
    document.getElementById("defaultCanvas0").style.cursor = "default";

    // Check if the mouse is pressed
    if (mouseIsPressed && mouseY < 623 && mouseX > 0 && mouseButton === LEFT && mouseY > 0){

      const pixelColor = get(mouseX, mouseY);

      // Set the target and replacement colors
      const targetColor = pixelColor;
      const replacementColor = color(`${colourP.selectedColour}`);


      let startX = mouseX;
      let startY = mouseY;

      loadPixels();

      // Perform flood fill on the canvas using FillTool
      floodFill(startX, startY, targetColor, replacementColor);
      


    }
  };
}
// using the floodfill algorithm that checks if the color of the clicked pixels on the canvas has the same color as the target color, 
// if not it stops, if it is the same color, the algorithm starts replacing that color with the replacement color 

function floodFill(startX, startY, targetColor, replacementColor) {
  const queue = [];
  const filledPixels = new Uint32Array(width * height);


  // Get the starting pixel's color
  const startColor = get(startX, startY);

  // Check if the starting pixel already has the replacement color
  if (colorsMatch(startColor, replacementColor)) {
    return;
  }

  // Push the starting pixel onto the queue
  queue.push({ x: startX, y: startY });


  while (queue.length > 0) {

    const { x, y } = queue.shift(); // Use shift() instead of pop()

    // Check if the current pixel is not within the canvas boundaries
    if (x < 0 || x >= width || y < 0 || y >= height) {
      continue;
    }

    // Calculate the pixel index in the filledPixels array
    const pixelIndex = y * width + x;

    // Check if the current pixel is already filled or has a different color than the target color
    if (filledPixels[pixelIndex] || !colorsMatch(get(x, y), targetColor)) {
      continue;
    }

    // Set the pixel's color to the replacement color
    set(x, y, replacementColor);
    // Mark the current pixel as filled
    filledPixels[pixelIndex] = true;

    // Push the neighboring pixels onto the queue
    queue.push({ x: x + 1, y });
    queue.push({ x: x - 1, y });
    queue.push({ x, y: y + 1 });
    queue.push({ x, y: y - 1 });
  }
  updatePixels();
  
}


function colorsMatch(color1, color2) {
  return (
    red(color1) === red(color2) &&
    green(color1) === green(color2) &&
    blue(color1) === blue(color2)
  );
}
