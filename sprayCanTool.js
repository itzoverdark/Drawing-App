function sprayCanTool(){
    this.name = "sprayCanTool";
    this.icon = "fa-solid fa-spray-can";
    this.title = "Spray Tool";


    var SizeValue = localStorage.getItem("SizeValue") || 5;

    let squareSpray = false;
    let ellipseSpray = false;
    let triangleSpray = false;
    

    this.draw = function(){

        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        
        this.spread = SizeValue;

        let sprayDiv = document.createElement("div");
	    sprayDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px"><path d="M96 32v96H224V32c0-17.7-14.3-32-32-32H128C110.3 0 96 14.3 96 32zm0 128c-53 0-96 43-96 96V464c0 26.5 21.5 48 48 48H272c26.5 0 48-21.5 48-48V256c0-53-43-96-96-96H96zm64 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM384 48c0-1.4-1-3-2.2-3.6L352 32 339.6 2.2C339 1 337.4 0 336 0s-3 1-3.6 2.2L320 32 290.2 44.4C289 45 288 46.6 288 48c0 1.4 1 3 2.2 3.6L320 64l12.4 29.8C333 95 334.6 96 336 96s3-1 3.6-2.2L352 64l29.8-12.4C383 51 384 49.4 384 48zm76.4 45.8C461 95 462.6 96 464 96s3-1 3.6-2.2L480 64l29.8-12.4C511 51 512 49.4 512 48c0-1.4-1-3-2.2-3.6L480 32 467.6 2.2C467 1 465.4 0 464 0s-3 1-3.6 2.2L448 32 418.2 44.4C417 45 416 46.6 416 48c0 1.4 1 3 2.2 3.6L448 64l12.4 29.8zm7.2 100.4c-.6-1.2-2.2-2.2-3.6-2.2s-3 1-3.6 2.2L448 224l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L448 256l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L480 256l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6c0-1.4-1-3-2.2-3.6L480 224l-12.4-29.8zM448 144c0-1.4-1-3-2.2-3.6L416 128 403.6 98.2C403 97 401.4 96 400 96s-3 1-3.6 2.2L384 128l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L384 160l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L416 160l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6z"/></svg>'

		document.getElementById('defaultCanvas0').style.cursor = `url('data:image/svg+xml;base64,${btoa(sprayDiv.innerHTML)}') 10 0, auto`;
        
        if(mouseIsPressed && mouseY < height && mouseY >= 0 && mouseX < width && mouseX >= 0 && mouseButton === LEFT){
            if (squareSpray) {
                loadPixels();
                for(var i = 0; i < 300; i++){
                    point(random(mouseX-this.spread, mouseX + this.spread), 
                        random(mouseY-this.spread, mouseY+this.spread));
                }
            }
            else if (ellipseSpray) {
                loadPixels();
                for(var i = 0; i < 300; i++){
                    // Generate random angle within a circle
                    var angle = random(0, 2 * Math.PI);
                    // Calculate random distance from the center of the circle
                    var distance = random(0, this.spread);
                    // Calculate the coordinates of the point within the circle
                    var x = mouseX + distance * Math.cos(angle);
                    var y = mouseY + distance * Math.sin(angle);
                    // Draw the point
                    point(x, y);
            }
            
    }
    }
}
    this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function() {
		select(".options").html(
            "<button id='ellipseSpray' style='padding:10px; border-radius:5px'><i class='fa-regular fa-circle'></i></button>&nbsp;<button id='squareSpray' style='padding:10px; border-radius:5px'><i class='fa-sharp fa-regular fa-square'></i></button>&nbsp;<button id='triangleSpray' style='padding:10px; border-radius:5px'>△</button><br><input type='range' id='size' min='0' max='100'>Change Size");
            //click handler
		select("#ellipseSpray").mouseClicked(function() {
            squareSpray = false;
			ellipseSpray = true;
            triangleSpray = false;
		});
        select("#squareSpray").mouseClicked(function() {
			ellipseSpray = false;
            squareSpray = true;
            triangleSpray = false;
		});
        select("#triangleSpray").mouseClicked(function() {
            triangleSpray = true;
			ellipseSpray = false;
            squareSpray = false;
		});

        var SizeInput = select("#size");

        // I set it so that the user doesn't have to set it everytime he uses another tool
        // So i store the value on the browsers local storage

        SizeInput.value(SizeValue)

        SizeInput.input(function() {
            SizeValue = SizeInput.value();
            localStorage.setItem("SizeValue", SizeValue);
          });
          
         
        
	};
};
