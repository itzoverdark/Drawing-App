let rectangles = [];
let currentRect = null;
let offsetX, offsetY;

function setup() {
  createCanvas(800, 600);
}
function mousePressed() {
  cuttingTool.mousePressed();
}

function mouseReleased() {
  cuttingTool.mouseReleased();
}

  


function createCuttingTool() {
  const tool = {
    icon: "fa-solid fa-scissors",
    name: "cuttingTool",
    startX: 100,
    startY: 100,
    finishX: 0,
    finishY: 0,
    offsetX: 0,
    offsetY: 0,
    dragging: false,
    drawing: false,
    draggedRect: null,
    backgroundInsideRectangle: null,
    rectangles: [],

    update() {
      document.getElementById("defaultCanvas0").style.cursor = "default";
      if (mouseIsPressed && !this.dragging) {
        if (!this.drawing) {
          this.startX = mouseX;
          this.startY = mouseY;
          this.drawing = true;
        } else {
          this.finishX = mouseX - this.startX;
          this.finishY = mouseY - this.startY;
          updatePixels();
        }
      }

      if (mouseIsPressed && this.draggedRect) {
        this.draggedRect.startX = mouseX - this.offsetX;
        this.draggedRect.startY = mouseY - this.offsetY;
        // stroke(color(bg.get(0,0)[0],bg.get(0,0)[0],bg.get(0,0)[0]));
        // console.log(bg.get(0,0)[0])
        updatePixels();
      }
    },

    draw() {
      for (let rectObj of this.rectangles) {
        noFill();
        rect(rectObj.startX, rectObj.startY, rectObj.finishX, rectObj.finishY);
      }

      if (this.drawing) {
        noFill();
        rect(this.startX, this.startY, this.finishX, this.finishY);
      }
    },

    mousePressed() {
      if (this.dragging || this.drawing) return;

      for (let rectObj of this.rectangles) {
        if (
          mouseX >= rectObj.startX &&
          mouseY >= rectObj.startY &&
          mouseX <= rectObj.startX + rectObj.finishX &&
          mouseY <= rectObj.startY + rectObj.finishY && !rectObj.dragged
        ) {
          this.backgroundInsideRectangle = get(
            rectObj.startX,
            rectObj.startY,
            rectObj.finishX,
            rectObj.finishY
          );
          this.offsetX = mouseX - rectObj.startX;
          this.offsetY = mouseY - rectObj.startY;

          this.initialDragX = rectObj.startX;
          this.initialDragY = rectObj.startY;

          this.dragging = true;
          this.draggedRect = rectObj;
          return;
        }
      }
    },

    mouseReleased() {
      this.dragging = false;

      if (this.draggedRect) {
        let offsetX = mouseX - this.initialDragX;
        let offsetY = mouseY - this.initialDragY;

        // Update the rectangle's position
        this.draggedRect.startX += offsetX;
        this.draggedRect.startY += offsetY;

        if (this.backgroundInsideRectangle) {
          // Clear the dragged area with white
          fill(255);
          rect(
            this.draggedRect.startX,
            this.draggedRect.startY,
            this.draggedRect.finishX,
            this.draggedRect.finishY
          );

          // Draw the buffer image at the updated rectangle position
          image(
            this.backgroundInsideRectangle,
            this.draggedRect.startX,
            this.draggedRect.startY,
            this.draggedRect.finishX,
            this.draggedRect.finishY
          );
        }

        this.backgroundInsideRectangle = null; // Reset the copied background
        this.draggedRect.dragged = true;
        this.draggedRect = null;
      }

      if (this.drawing) {
        if (this.finishX !== 0 && this.finishY !== 0) {
          this.rectangles.push({
            startX: this.startX,
            startY: this.startY,
            finishX: this.finishX,
            finishY: this.finishY,
            dragged: false,
          });
          this.finishX = 0;
          this.finishY = 0;
        }
      }
      this.drawing = false;
    },
  };
  return tool;
}
