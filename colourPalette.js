// Displays and handles the colour palette.
function ColourPalette() {
    //a list of web colour strings
    this.colours = [
      "black", "silver", "gray", "white", "maroon", "red", "purple",
      "orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
      "blue", "teal", "aqua"
    ];
    //make the start colour be black
    this.selectedColour = "black";

    var self = this;

    var paletteColourClick = function () {
      // Get the new colour from the id of the clicked element
      var c = this.id().split("Swatch")[0];

      // Check if the current selectedColour element exists before modifying its style
      var current = select("#" + self.selectedColour + "Swatch");
      if (current) {
        current.style("border", "0");
      }

      self.selectedColour = c;
      fill(c);
      stroke(c);

      // Add a new border to the selected colour
      this.style("border", "2px solid blue");

      // Update the input color value
      var inputColorElement = document.getElementById("choseColor");
      inputColorElement.value = c;
    };

    var inputColourClick = function () {
      // Get color from input
      let color = document.getElementById("choseColor").value;

      // Check if the current selectedColour element exists before modifying its style
      var current = select("#" + self.selectedColour + "Swatch");
      if (current) {
        current.style("border", "0");
      }

      // Set the selected colour and fill and stroke
      self.selectedColour = color;
      fill(color);
      stroke(color);
    };

    //load in the colours
    this.loadColours = function () {
      //set the fill and stroke properties to be black at the start of the programme
      //running
      fill(this.colours[0]);
      stroke(this.colours[0]);

      //for each colour create a new div in the html for the colourSwatches
      for (var i = 0; i < this.colours.length; i++) {
        var colourID = this.colours[i] + "Swatch";

        var colourSwatch = createDiv();
        colourSwatch.class('colourSwatches');
        colourSwatch.id(colourID);

        select(".colourPalette").child(colourSwatch);
        select("#" + colourID).style("background-color", this.colours[i]);
        colourSwatch.mouseClicked(paletteColourClick);
      }

      // Add a click listener for the input color element
      var inputColorElement = document.getElementById("choseColor");
      inputColorElement.addEventListener("change", inputColourClick);

      // Set the initial selected colour border
      var initialSelectedColour = select("#" + this.selectedColour + "Swatch");
      if (initialSelectedColour) {
        initialSelectedColour.style("border", "2px solid blue");
      }
    };

    //call the loadColours function now it is declared
    this.loadColours();
  }