function Shapes(){
    this.name = "shapes";
    this.icon = "fa-solid fa-shapes";
    this.title = "Shape Tool";

    this.startMouseX = 0;
    this.startMouseY = 0;
    this.drawing = false;

    let drawCircle = false;
    let drawRectangle = false;
    let drawTriangle = false;
    let drawStar = false;
    let drawHeart = false;



    this.draw = function() {

        document.getElementById('defaultCanvas0').style.cursor = "default";


        if(drawRectangle) {
            if (mouseIsPressed && mouseButton === LEFT) {
                if (!this.drawing) {
                    this.startMouseX = mouseX;
                    this.startMouseY = mouseY;
                    this.drawing = true;
                    loadPixels();
                } else {
                    updatePixels();
                    noFill();
                    rect(this.startMouseX, this.startMouseY, mouseX - this.startMouseX, mouseY - this.startMouseY);
                }
            }   else if (this.drawing){
                    this.drawing = false;
            }
        } else if (drawCircle) {
            if (mouseIsPressed && mouseButton === LEFT) {
                if (!this.drawing) {
                    this.startMouseX = mouseX;
                    this.startMouseY = mouseY;
                    this.drawing = true;
                    loadPixels();
                } else {
                    updatePixels();
                    noFill();
                    ellipse(this.startMouseX, this.startMouseY, mouseX - this.startMouseX, mouseY - this.startMouseY);
                }
            }   else if (this.drawing){
                    this.drawing = false;
            }
        } else if (drawTriangle) {
            if (mouseIsPressed && mouseButton === LEFT) {
                if (!this.drawing) {
                    this.startMouseX = mouseX;
                    this.startMouseY = mouseY;
                    this.drawing = true;
                    loadPixels();
                } else {
                    updatePixels();
                    noFill();
                    let x1 = this.startMouseX;
                    let y1 = this.startMouseY;
                    let x2 = mouseX;
                    let y2 = mouseY;
                    let x3 = 2 * this.startMouseX - mouseX;
                    let y3 = mouseY;
                    triangle(x1, y1, x2, y2, x3, y3);
                }
            } else if (this.drawing){
                this.drawing = false;
        }
        } else if (drawStar) {
            if (mouseIsPressed && mouseButton === LEFT) {
              if (!this.drawing) {
                this.startMouseX = mouseX;
                this.startMouseY = mouseY;
                this.drawing = true;
                loadPixels();
              } else {
                updatePixels();
                noFill();
                let cx = (this.startMouseX + mouseX) / 2;
                let cy = (this.startMouseY + mouseY) / 2;
                let radius = dist(this.startMouseX, this.startMouseY, mouseX, mouseY);
                let innerRadius = radius * 0.5;
                star(cx, cy, radius, innerRadius, 5);
              }
            } else if (this.drawing) {
              this.drawing = false;
            }
          }if (drawHeart) {
            if (mouseIsPressed && mouseButton === LEFT) {
                if (!this.drawing) {
                    this.startMouseX = mouseX;
                    this.startMouseY = mouseY;
                    this.drawing = true;
                    loadPixels();
                } else {
                    updatePixels();
                    noFill();
                    drawCustomHeart(this.startMouseX, this.startMouseY, mouseX, mouseY);
                }
            } else if (this.drawing) {
                this.drawing = false;
            }
        }
    }

    this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};

	
	this.populateOptions = function() {
		select(".options").html(
            "<button id='drawRectangle' style='padding:10px; border-radius:5px'><i class='fa-sharp fa-regular fa-square'></i></button><button id='drawCircle' style='padding:10px; border-radius:5px'><i class='fa-regular fa-circle'></i></button><button id='drawTriangle' style='padding:10px; border-radius:5px'><img src='assets/triangle.png' height='12px'></button><button id='drawStar' style='padding:10px; border-radius:5px'><i class='fa-regular fa-star'></i></button><button id='drawHeart' style='padding:10px; border-radius:5px'><i class='fa-regular fa-heart'></i></button>");
            //click handler
		select("#drawRectangle").mouseClicked(function() {
            drawCircle = false;
            drawTriangle = false;
            drawStar = false;
            drawHeart = false;
            drawRectangle = true;
		});
        select("#drawCircle").mouseClicked(function() {
            drawRectangle = false;
            drawTriangle = false;
            drawCircle = true;
            drawHeart = false;
            drawStar = false;
		});
        select("#drawTriangle").mouseClicked(function() {
            drawCircle = false;
            drawRectangle = false
            drawTriangle = true;
            drawStar = false;
            drawHeart = false;

		});
        select("#drawStar").mouseClicked(function() {
            drawCircle = false;
            drawRectangle = false
            drawTriangle = false;
            drawStar = true;
            drawHeart = false;
		});
        select("#drawHeart").mouseClicked(() => {
            drawCircle = false;
            drawRectangle = false
            drawTriangle = false;
            drawStar = false;
            drawHeart = true;
        })
    }
    function star(cx, cy, radius, innerRadius, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2;
        let tilt = PI / 11; // Tilt angle in radians
      
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
          let sx = cx + cos(a - tilt) * radius;
          let sy = cy + sin(a - tilt) * radius;
          vertex(sx, sy);
          sx = cx + cos(a + halfAngle - tilt) * innerRadius;
          sy = cy + sin(a + halfAngle - tilt) * innerRadius;
          vertex(sx, sy);
        }
        endShape(CLOSE);
      }

      function drawCustomHeart(x1, y1, x2, y2) {
        // Calculate the heart coordinates based on the mouse position
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const width = abs(x2 - x1);
        const height = abs(y2 - y1);
        const radius = 0.3 * min(width, height);
      
        // Draw the heart shape
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += 0.001) {
            const x = cx + 13 * pow(sin(angle), 3) * radius;
            const y = cy - (10 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle)) * radius;
            vertex(x, y);
        }
        endShape(CLOSE);
    }
      
      
}
