function Eraser(){
    this.icon = "fa-solid fa-eraser";
	  this.name = "eraser";
    this.title = "Eraser";
    var eraserSizeValue = localStorage.getItem("size") || 20;

    this.draw = function(){
      

		  document.getElementById('defaultCanvas0').style.cursor = "default";
      
        // if the user clicks on the mouse and the coordinates are within the canvas
        if (mouseIsPressed && mouseY < 623 && mouseX > 0 && mouseButton === LEFT){
            loadPixels();
            fill(colourP.selectedColour);
            stroke(colourP.selectedColour);
            ellipse(mouseX , mouseY , eraserSizeValue);
          // if the user releases the mouse button, a border will appear for better visiblity as to where the user will erase
          } else if(mouseY < 499 && mouseX > 0 && mouseY > 0 && mouseY <= height){
            updatePixels();
            fill(100,100,100);
            noStroke();
            ellipse(mouseX , mouseY , eraserSizeValue);
          } else {
            updatePixels();
          }
        
        
    }

    
      this.unselectTool = function() {
    	updatePixels();
    	//clear options
    	select(".options").html("");
    };

    this.populateOptions = function() {
        // Create the range input element
        select(".options").html("<input type='range' id='size' min='0' max='100' style='z-index='9000''>Change Size");


    
        // Get the range input element
        var eraserSizeInput = select("#size");

        eraserSizeInput.value(eraserSizeValue);
    
        // Add an event listener to the input element to update the eraserSizeValue
        eraserSizeInput.input(function() {
          eraserSizeValue = eraserSizeInput.value();
          
          localStorage.setItem("size", eraserSizeValue);

        });
      };

      
}