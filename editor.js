/*******
 * define this "sliderInfo" variable
 * have an entry for each slider you want
 * and each row should be:
 * ["object_field", minimum_bound, maximum_bound]
 */
const sliderInfo = [
  ["MainPosX", -120, 120],
  ["MainPosY", -140, 40],
  ["MainRadiusA", 0, 160],
  ["MainRadiusB", 0, 160],
  ["MainRadiusC", 0, 160],
  ["RoundCorRadA", 0, 80],
  ["RoundCorRadB", 0, 80],
  ["RoundCorRadC", 0, 80],
  ["RoundCorRadD", 0, 80],
  ["PartPosX", -80, 80],
  ["PartPosY", -80, 80],
  ["PartRadiusD", 0, 160],
  ["PartRadiusE", 0, 160],
  ["PartCorRad", 0, 80],
  ["StartA", 0 ,360],
  ["EndA", 0 ,360],
  ["StartB", 0 ,360],
  ["EndB", 0 ,360],
  ["StartC", 0 ,360],
  ["EndC", 0 ,360]
];

// PROBABLY DON't NEED TO EDIT ANYTHING ELSE.
const numSliders = sliderInfo.length;

if (typeof systemBackgroundColor === 'undefined') {
    var systemBackgroundColor = "#f2e2d5";
}

// this will use variables if they are already defined
// var systemBackgroundColor = systemBackgroundColor || "#e3eded";

// if everything is defined above, this should just work
function sliderToDataObject() {
  let obj = {};
  for (let i=0; i<numSliders; i=i+1) {
    o_name = sliderInfo[i][0]
    bounds_low = sliderInfo[i][1]
    bounds_high = sliderInfo[i][2]
    obj[o_name] = map(param_sliders[i].value(), 0, 100, bounds_low, bounds_high);
  }
  return obj;
}

let param_sliders = [];

let main_canvas = null;

const canvasWidth = 960;
const canvasHeight = 500;

let debugBox = false;

function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // rotation in degrees (more slider friendly)
  angleMode(DEGREES);

  for(let i=0; i<numSliders; i++) {
    let cur_row = select("#row" + (i+1))
    cur_row.show();
    let cur_slider = createSlider(0, 100, 50)
    let containerString = "slider" + (i+1) + "Container"
    cur_slider.parent(containerString);
    param_sliders.push(cur_slider);
  }

  button = createButton('show data');
  button.mousePressed(buttonPressedEvent);
  button.parent(buttonContainer);
}

function buttonPressedEvent() {
  let obj = sliderToDataObject();
  json = JSON.stringify(obj, null, 2);
  alert(json);
}

function draw () {
  // clear screen
  background(systemBackgroundColor);

  // compute the center of the canvas
  let center_x = canvasWidth / 2;  
  let center_y = canvasHeight / 2;

  // draw the letters A, B, C from saved data
  push();
  scale(2);
  translate(width/4 - 50, 25);

  if (debugBox) {
    noFill()
    strokeWeight(4);
    stroke(0, 200, 0);
    rect(0, 0, 100, 200);
  }

  let obj = sliderToDataObject();
  drawLetter(obj);
  pop();
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
  else if (key == 'd') {
    debugBox = !debugBox;
    // console.log("debugBox is now: " + debugBox);
    redraw();
  }
  else if (key == ' ') {
    let obj = sliderToDataObject();
    json = JSON.stringify(obj, null, 2);
    console.log(json);
  }
}
