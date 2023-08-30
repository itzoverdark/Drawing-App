//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var backgroundColor;
var bg;
let cuttingTool;
let pencil;
let fillBuckets;
let rectangles = [];
let shapeTool;
let eraserTool;
let sprayCan;
let linetool;
let texttool;
// var fillTool;



function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width -2, canvasContainer.size().height -2);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.


	cuttingTool = new createCuttingTool();

	pencil = new FreehandTool();	
	fillBuckets = new FillTool();
	shapeTool = new Shapes();
	eraserTool = new Eraser();
	sprayCan = new sprayCanTool();
	linetool = new LineToTool();
	texttool = new textTool();


	

	toolbox.addTool(pencil);
	toolbox.addTool(sprayCan);
	toolbox.addTool(eraserTool);
	toolbox.addTool(shapeTool);
	toolbox.addTool(fillBuckets);
	// toolbox.addTool(new mirrorDrawTool());


	toolbox.addTool(cuttingTool);
	toolbox.addTool(linetool);
	toolbox.addTool(texttool);

	// fillTool = new FillTool();
	
	bg = background(255);
	
}

function draw() {


	
	
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	
	
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
		
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}

	
	if (toolbox.selectedTool === cuttingTool) {
		cuttingTool.update();
		cuttingTool.draw();
	  }

	
	
}
