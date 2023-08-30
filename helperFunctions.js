function HelperFunctions() {

	let self = this; // Store a reference to the HelperFunctions object

	this.drawingHistory = [];
	returnDrawing = [];



	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		location.reload();
		background(255);
		self.drawingHistory = [];
		returnDrawing = [];

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas('drawing','png');
	});

	
	

	select("#defaultCanvas0").mouseReleased(function() {
		if (mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < width) {
			if (toolbox.selectedTool !== cuttingTool && toolbox.selectedTool !== linetool && toolbox.selectedTool !== texttool) {
				let drawingSnapshot = get(); // Create a screenshot of the canvas
				self.drawingHistory.push(drawingSnapshot); // Store the screenshot in the history array
				if (self.drawingHistory.length > 0){
					returnDrawing = [];
				}
			}
			
		}	
	})
	


	
	
	select("#goBack").mouseClicked(function () {
		if (self.drawingHistory.length > 0) {
		  let lastDrawing = self.drawingHistory.pop(); // Remove the last saved snapshot from the history array
		  returnDrawing.push(lastDrawing); // Push the undone drawing to the redo history
		  clearCanvas(); // Clear the canvas
		  redrawDrawingHistory(); // Redraw the drawing history
		  redrawTextToolSnapshots();
		}
	  });
	
	  // Event handler for the return drawing button
	  select("#returnDrawing").mouseClicked(function () {
		if (returnDrawing.length > 0) {
		  let lastDrawing = returnDrawing.pop();
		  self.drawingHistory.push(lastDrawing); // Push the redo drawing back to the history
		  clearCanvas();
		  redrawDrawingHistory();
		  redrawTextToolSnapshots();
		}
	  });
	
	  // Function to clear the canvas
	  function clearCanvas() {
		background(255);
	  }
	
	  // Function to redraw the entire drawing history
	  function redrawDrawingHistory() {
		for (let i = 0; i < self.drawingHistory.length; i++) {
		  image(self.drawingHistory[i], 0, 0);
		}
	  }
	  function redrawTextToolSnapshots() {
		// background(255);
		for (let i = 0; i < self.drawingHistory.length; i++) {
			image(self.drawingHistory[i], 0, 0);
			if (self.drawingHistory[i].textToolSnapshot) {
				// Redraw the text tool snapshot on top of the canvas
				image(self.drawingHistory[i].textToolSnapshot, 0, 0);
			}
		}
		loadPixels();

	}

	document.getElementById("imageInput").addEventListener("change", handleImageUpload);

	function handleImageUpload(event) {
	const file = event.target.files[0];
	if (file) {
		const img = loadImage(URL.createObjectURL(file), function (loadedImage) {
		// background(255); // Clear the canvas
		image(loadedImage, 0, 0, width, height); // Set the uploaded image as the background
		helpers.drawingHistory.push(get());
		});
	}
	}

	// Add an event listener to the rotate button
	document.getElementById("rotateButton").addEventListener("click", function () {
		rotateCanvas();
	});
	
	// Initial canvas rotation angle (in degrees)
	let rotationAngle = 0;
	
	// Function to rotate the canvas
	// Function to rotate the canvas
	// Function to rotate the canvas
	function rotateCanvas() {
		// Increment the rotation angle by 90 degrees
		rotationAngle += 90;

		// Save the current transformation state
		push();

		// Reset the canvas transformation
		translate(width / 2, height / 2);
		rotate(radians(rotationAngle));
		
		// Clear the canvas
		background(255);

		// Draw the drawing history
		for (let i = 0; i < self.drawingHistory.length; i++) {
			image(self.drawingHistory[i], -width / 2, -height / 2);
		}

		// Restore the previous transformation state
		pop();
	}
	
}
