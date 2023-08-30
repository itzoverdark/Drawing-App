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
    title: "Cutting Tool",
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
      if (mouseIsPressed && !this.dragging && mouseX > 0 && mouseY > 0) {
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
        if (!this.backgroundInsideRectangle) {
          this.backgroundInsideRectangle = get(
            this.draggedRect.startX,
            this.draggedRect.startY,
            this.draggedRect.finishX,
            this.draggedRect.finishY
          );
        }
    
        this.draggedRect.startX = mouseX - this.offsetX;
        this.draggedRect.startY = mouseY - this.offsetY;
        updatePixels();
    
        // Clear the whole canvas to white
        // background(255);
        // this.draw(); // Draw all rectangles
    
        
        image(
        this.backgroundInsideRectangle,
        this.draggedRect.startX,
        this.draggedRect.startY,
        this.draggedRect.finishX,
        this.draggedRect.finishY
      );        
      }
    }, 
    draw() {
      // UpdatePixels to clear the previous drawing

      for (let rectObj of this.rectangles) {
        noFill();
        stroke(255);
        rect(rectObj.startX, rectObj.startY, rectObj.finishX, rectObj.finishY);
      }

      if (this.drawing) {
        noFill();
        stroke(0);
        rect(this.startX, this.startY, this.finishX, this.finishY);
      }
    },

    mousePressed() {
      if (this.dragging || this.drawing) return;
    
      let clickedInsideRectangle = false;
      for (let rectObj of this.rectangles) {
        if (
          mouseX >= rectObj.startX &&
          mouseY >= rectObj.startY &&
          mouseX <= rectObj.startX + rectObj.finishX &&
          mouseY <= rectObj.startY + rectObj.finishY
        ) {
          this.offsetX = mouseX - rectObj.startX;
          this.offsetY = mouseY - rectObj.startY;
    
          this.initialDragX = rectObj.startX;
          this.initialDragY = rectObj.startY;
    
          this.dragging = true;
          this.draggedRect = rectObj;
          clickedInsideRectangle = true;
          break; // No need to check further
        }
      }
    
      if (!clickedInsideRectangle) {
        // Clear the existing rectangles
        this.rectangles = [];
    
        // Start drawing a new rectangle
        this.startX = mouseX;
        this.startY = mouseY;
        this.drawing = true;
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

        // Clear the dragged area with white
        fill(255);
        noStroke();
        rect(
          this.initialDragX,
          this.initialDragY,
          this.draggedRect.finishX,
          this.draggedRect.finishY
        );

        this.draggedRect.dragged = true;
        this.draggedRect = null;
        
        // Set noStroke() for the drawn rectangles
        
        // noStroke();
        
        loadPixels();
        updatePixels();
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
          this.drawing = false; // Reset the drawing state here
        }
      }
    },
  };
  return tool;
}





