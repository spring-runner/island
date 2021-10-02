class ImageLoader {
  constructor() {
    this.canvas = new OffscreenCanvas(0, 0);
    this.canvas2 = new OffscreenCanvas(0, 0);
    this.img = null;
  }
  load(file) {
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var img = new Image();
    img.src = file;
    this.img = img;
    return this;
  }
  image() {
    return this.img;
  }
  section(x, y, width, height) {
    this.canvas.width = this.img.width;
    this.canvas.height = this.img.height;
    var ctx = this.canvas.getContext("2d");
    ctx.drawImage(this.img, this.canvas.width, this.canvas.height);
    var ctx2 = this.canvas2.getContext("2d");
    var data = ctx.getImageData(x, y, width, height);
    this.canvas2.width = width;
    this.canvas2.height = height;
    this.canvas2.putImageData(data, 0, 0);
    var img = new Image();
    img.src = this.canvas2.toDataURL();
    return img;
  }
  spritesheet(options = {}) {
    options = Object.assign({
      cols:1,  // The amount of columns in the spritesheet
      rows:1,  // The amount of rows in the spritesheet
      gap:0,   // The gap between each frame in the spritesheet
      border:0 // The border around the edge of the spritesheet
    }, options);
    var tileWidth = (this.img.width - (options.border * 2)) / options.cols + (options.gap * (options.cols - 1));
    var tileHeight = (this.img.height - (options.border * 2)) / options.rows + (options.gap * (options.rows - 1));
    var sheet = new Spritesheet();
    for (var y = 0; y < options.rows; y++) {
      for (var x = 0; x < options.cols; x++) {
        sheet.setFrame(x, y, this.section(
          tileWidth * x + options.border + options.gap * x,
          tileHeight * y + options.border + options.gap * y,
          tileWidth,
          tileHeight
        ));
      }
    }
    return sheet;
  }
}

class Spritesheet {
  constructor() {
    this.frames = [];
  }
  setFrame(x, y, image) {
    this.frames[y] = this.frames[y] || [];
    this.frames[y][x] = image;
  }
  getFrameAt(x, y = null) {
    if (y == null) {
      this.getFrameAtIndex(x);
    }
    if (this.frames[y] == null || this.frames[y][x] == null) {
      throw new Error("Frame at " + x + ", " + y + " was not found in image '" + this.img.src + "'");
    }
    return this.frames[y][x];
  }
  getFrameAtIndex(i) {
    this.getFrameAt(i % this.frames[0].length, Math.floor(i / this.frames[0].length));
  }
}
