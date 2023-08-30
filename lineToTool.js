function LineToTool(){
	this.icon = "fa-solid fa-minus";
	this.name = "LineTool";
	this.title = "Line Tool";

	var editMode = false;

	var currentShape = [];

	loadPixels();




	function mousePressOnCanvas() {
        if(mouseIsPressed && mouseY < height && mouseY >= 0 && mouseX < width && mouseX >= 0 && mouseButton === LEFT){
			return true;
		} else {
			return false;
		}
	}

	// draws the line to the screen only if the mouse is pressed
	this.draw = function(){
		noFill();
	
		document.getElementById('defaultCanvas0').style.cursor = "default";
		updatePixels();
		if(mousePressOnCanvas()){
			if(!editMode){
				currentShape.push({
					x: mouseX,
					y: mouseY
				});

			} else {
				for(let i=0; i<currentShape.length;i++){
					if(dist(mouseX,mouseY,currentShape[i].x, currentShape[i].y) < 15){
						currentShape[i].x = mouseX;
						currentShape[i].y = mouseY;
					}
					
				}
				
			}
	}

	beginShape();
	for(let i=0;i<currentShape.length;i++){
		vertex(currentShape[i].x, currentShape[i].y);
		if(editMode){
			fill(255,0,0);
			ellipse(currentShape[i].x, currentShape[i].y,5,5);
			noFill();
		}
	}
	endShape();

	};
this.unselectTool = function() {
	updatePixels();
	//clear options
	select(".options").html("");
};
this.populateOptions = function() {
	// Create the range input element
  
	// Attach event listeners to the buttons
	select(".options").html("<button id='editbutton'>Edit Shape</button>&nbsp;<button id='finishbutton'>Finish Shape</button><br><p>This tool is used to draw shapes by clicking.</p><p>Click finish shape in order for the drawing to stay on the canvas</p>");
  
	select("#editbutton").mouseClicked(function() {
	  if (editMode) {
		editMode = false;
		select("#editbutton").html("Edit Shape");
	  } else {
		editMode = true;
		select("#editbutton").html("Add Vertices");
	  }
	});
  
	select("#finishbutton").mouseClicked(function() {
	  editMode = false;
	  draw();
	  loadPixels();
	  currentShape = [];
	  helpers.drawingHistory.push(get());
	});
  };
  

}


