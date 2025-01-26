let webcam;
let squareSystem = [];
let scale = 18;
let colorSlider;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scale, height / scale);
  webcam.hide();
  
  // Create a slider to adjust color (alpha)
  colorSlider = createSlider(0, 255, 120);
  colorSlider.position(10, height + 10); 
  
  for (let x = 0; x < 200; x++) {
    let rx = random(15, width - 15);
    let ry = random(15, height - 15);
    let r = random(4, 30);
    squareSystem[x] = new Square(rx, ry, r);
  }
}

function draw() {
  webcam.loadPixels();
  for (let x = 0; x < squareSystem.length; x++) {
    squareSystem[x].move();
    squareSystem[x].show();
    squareSystem[x].checkEdges();
  }
}

class Square {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-8, 8);
    this.y = this.y + random(-8, 8);
  }

  show() {
    let pX = this.x / scale;
    let pY = this.y / scale;
    let pixelColor = webcam.get(pX, pY);
    
    // Get the current value of the slider for alpha transparency
    let sliderValue = colorSlider.value();
    
    // Apply the slider value to the alpha channel of the webcam color
    fill(pixelColor[0], pixelColor[1], pixelColor[2], sliderValue);
    noStroke();
    rect(this.x, this.y, this.r, this.r); 
  }

  checkEdges() {
    if (this.x < 15) {
      this.x = 15;
    } else if (this.x > width - 15) {
      this.x = width - 15;
    }
    if (this.y < 15) {
      this.y = 15;
    } else if (this.y > height - 15) {
      this.y = height - 15;
    }
  }
}

