function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "fa-solid fa-pen";
	this.name = "freehand";
	this.title = "Pencil";

	var thickness = localStorage.getItem("thickness") || 5;


	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
	
	this.draw = function(){
		//if the mouse is pressed

		// to change the cursor shape
		
		let penDiv = document.createElement("div");
		penDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>'

		document.getElementById('defaultCanvas0').style.cursor = `url('data:image/svg+xml;base64,${btoa(penDiv.innerHTML)}') 0 19, auto`;
		// console.log(mouseX);
		if(mouseIsPressed && mouseButton === LEFT){
			// document.getElementById('defaultCanvas0').style.cursor = "url(path-to-pen-icon.png), auto";
			
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				loadPixels();
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				strokeWeight(thickness);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				strokeWeight(1);
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};


    this.populateOptions = function() {
		// Create the range input element
		select(".options").html("<input type='range' id='thickness' min='0' max='50'>Change thickness");
	
		// Get the range input element
		var thicknessInput = select("#thickness");
	
		// Set the initial value of the input range
		thicknessInput.value(thickness);
	
		// Add an event listener to the input element to update the thickness value
		thicknessInput.input(function() {
		  thickness = thicknessInput.value();
		  localStorage.setItem("thickness", thickness); // Store the thickness value in local storage
		});
	  };
}

