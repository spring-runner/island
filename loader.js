class ImageLoader {
  constructor() {
    this.img = null;
  }
  load(file) {
    var img = new Image();
    img.src = file;
    this.img = img;
    return this;
  }
  image() {
    return this.img;
  }
  section(x, y, width, height) {
    var canvas = new OffscreenCanvas(img.width, img.height);
    var ctx = canvas.getContext("2d");

    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, x, y, x + width, y + height);
    var img = new Image();
    img.src = canvas.toDataURL();
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
    return this.getFrameAt(i % this.frames[0].length, Math.floor(i / this.frames[0].length));
  }
}
