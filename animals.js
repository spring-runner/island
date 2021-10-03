class Animals {
  constructor() {
    this.animals = [];
  }
  update() {
    Chicken.trySpawn();
    for (var i = 0; i < this.animals.length; i++) {
      this.animals[i].update();
    }
  }
  draw() {
    var ctx = document.getElementById("gameBoard").getContext("2d");
    for (var i = 0; i < this.animals.length; i++) {
      var a = this.animals[i];
      ctx.translate(a.x, a.y);
      ctx.rotate(-a.dir);
      ctx.drawImage(a.getImage(), -a.width / 4, -a.height / 4);
      ctx.rotate(a.dir);
      ctx.translate(-a.x, -a.y);
    }
  }
}

class Animal {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dir = 0;
  }
  moveRandom() {
    this.x += Math.random() * 10 - 5;
    this.y += Math.random() * 10 - 5;
  }
  update() {
    return null;
  }
  getImage() {
    return null;
  }
  trySpawn() {
    return null;
  }
}

class Chicken extends Animal {
  constructor() {
    super();
    this.width = 36;
    this.height = 36;
    this.dirv = 0;
    this.run = 0;
    this.turn = 0;
    this.stopped = false;
    this.canTurn = true;
    this.age = Math.random() * 2 + 1;
    this.inTheDepths = false;
  }
  update() {
    if (this.turn > 0 || this.run > 0 && this.canTurn) {
      if (this.turn > 0) {
        this.dirv += Math.random() * 0.05 - 0.0025;
        this.dirv *= 0.9;
        this.dir += this.dirv;
      } else {
        this.dirv += Math.random() * 0.005 - 0.00025;
        this.dirv *= 0.99;
        this.dir += this.dirv / 10;
      }
    }
    var target = board[Math.floor((this.y + Math.sin(this.dir) * -10) / TILE_SIZE)][Math.floor((this.x + Math.cos(this.dir) * -10) / TILE_SIZE)];
    if (this.run > 0) {
      if (target != null && target.elevation != Elevation.depths && (target.elevation != Elevation.shallows || Math.random() > 0.9)) {
        this.x += Math.sin(this.dir) * -1;
        this.y += Math.cos(this.dir) * -1;
      } else {
        this.turn = Math.random() * 10 + 5;
        this.run = 0;
      }
    }
    this.run--;
    if (Math.random() > 0.995 && !this.stopped) {
      this.run = Math.random() * 100 * this.age;
    }
    this.turn--;
    if (Math.random() > 0.99 && this.turn < -5 && this.canTurn) {
      this.turn = Math.random() * 20;
    }
    if (board[Math.floor(this.y / TILE_SIZE)] == null) {
      animals.animals.splice(animals.animals.indexOf(this), 1);
      return;
    }
    var tile = board[Math.floor(this.y / TILE_SIZE)][Math.floor(this.x / TILE_SIZE)];
    if (tile == null || tile.elevation == Elevation.depths || this.age <= 0) {
      animals.animals.splice(animals.animals.indexOf(this), 1);
    }
    if (tile.elevation == Elevation.depths && !this.inTheDepths) {
      this.inTheDepths = true;
      console.log("Play plop.");
      audio.plop.play();
    }
    if (tile.elevation <= 1 && this.run <= 0) {
      this.stopped = true;
    }
    if (this.stopped && this.run <= 0) {
      this.canTurn = true;
    }
    if (tile.elevation <= 1) {
      this.run--;
      this.canTurn = false;
    }
    this.age -= 0.001;
  }
  getImage() {
    return IMAGES.CHICKEN.getFrameAtIndex(0);
  }
  static trySpawn() {
    if (Math.random() > 0.99 && animals.animals.length < 5) {
      for (var i = 0; i < 16; i++) {
        var x = Math.random() * BOARD_SIZE_PX;
        var y = Math.random() * BOARD_SIZE_PX;
        var tile = board[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
        if (tile.elevation >= 2) {
          var c = new Chicken();
          c.x = x;
          c.y = y;
          animals.animals.push(c);
          break;
        }
      }
    }
  }
}

var animals = new Animals();
