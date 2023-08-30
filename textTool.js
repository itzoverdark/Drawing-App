function textTool() {
    this.name = "textTool";
    this.icon = "fa-solid fa-font";
    this.title = "Text Tool";
    this.snapshot = null;
  
    this.startX = 0;
    this.startY = 0;
  
    this.finishX = 0;
    this.finishY = 0;
  
    this.drawing = false;
    this.typing = false;
    this.border = true;
    this.finishedTyping = false;
  
    let textInput = "";
  
    this.draw = function () {
      document.getElementById('defaultCanvas0').style.cursor = "default";
      
    if (mouseIsPressed && !this.typing) {
        textInput = "";
        if (!this.drawing && !this.typing) {
          this.startX = mouseX;
          this.startY = mouseY;
          this.drawing = true;
          
          // loadPixels(); 
        } else if (this.drawing && !this.typing) {
          this.finishX = mouseX - this.startX;
          this.finishY = mouseY - this.startY;
  
        updatePixels();
        noFill();
        stroke(0);
        rect(this.startX, this.startY, this.finishX, this.finishY);
          
        }
      } else if (this.drawing) {
        this.typing = true;
        this.drawing = false;
        // loadPixels();
      }

    //   this.drawText();
      if (!this.drawing){
          if (mouseIsPressed && !(mouseX > this.startX && mouseX - this.startX < this.finishX && mouseY > this.startY && mouseY - this.startY < this.finishY)) {
            // loadPixels();
            this.typing = false;
            if (textInput.length > 0){
              loadPixels();
            }
          }
      }
      // Inside the textTool draw function
      if (!this.drawing && this.typing && !this.snapshot) {
        // Capture the canvas state including the drawn rectangle
        this.snapshot = get();
        this.snapshot.textToolSnapshot = get(); // Capture a separate snapshot for text
      }
    }
    document.addEventListener("keydown", (event) => {
      if (toolbox.selectedTool === texttool) {
          // console.log("keydown");
          if (!this.drawing && this.typing) {
              if (event.key === "Enter") { // Add a check for the Enter key
                  textInput += "\n"; // If Enter is pressed, add a new line
              } else if (event.key == "Backspace"){
                  textInput = textInput.slice(0, -1);
              } 
              else if (event.key !== "Shift" && event.key !== "Alt" && event.key !== "Control" && event.key !== "Escape" && event.key !== "Shift" && event.key !== "AltGraph" && event.key !== "CapsLock"){
                  textInput += event.key;
                  
                  
              }
              updatePixels();
              fill(colourP.selectedColour);
              textSize(15);
              textStyle(NORMAL);
              text(textInput, this.startX, this.startY, this.finishX, this.finishY);
              this.snapshot = get(); // Capture the canvas snapshot after each key press
              helpers.drawingHistory.push(this.snapshot);
              
          }
      }
  });
  
    
    }




  
