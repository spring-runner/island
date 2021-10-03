var ImageLoader = {
  load: function load(path, callback = loader => null) {
    // Create an Image and set it's source path to the argument
    console.log("Loading image '" + path + "'");
    return new ImageLoader.Image(path, callback);
  },
  Image: class {
    constructor(path, callback) {
      var img = new Image();
      img.src = path;
      this.img = img;
      var loader = this;
      img.onload = function () {
        callback(loader);
      };
    }
    path() {
      return this.img.src;
    }
    image() {
      return this.img;
    }
    section(x, y, width, height) {
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(this.img, -x, -y);
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
      var tileWidth = (this.img.width - (options.border * 2) - options.gap * (options.cols - 1)) / options.cols;
      var tileHeight = (this.img.height - (options.border * 2) - options.gap * (options.rows - 1)) / options.rows;
      var sheet = new ImageLoader.Spritesheet();
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
  },
  Spritesheet:class {
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
}
