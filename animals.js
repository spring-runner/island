class Animals {
  constructor() {
    this.animals = [];
    var chickens = Math.random() * 5 + 7.5;
    for (var ic = 0; ic < chickens; ic++) {
      for (var i = 0; i < 16; i++) {
        var x = Math.random() * BOARD_SIZE_PX;
        var y = Math.random() * BOARD_SIZE_PX;
        var tile = board[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
        if (tile.elevation >= 2) {
          var c = new Chicken();
          c.x = x;
          c.y = y;
          this.animals.push(c);
          break;
        }
      }
    }
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
      drawCenteredSprite(ctx, a.name, 0, a.x, a.y, a.dir);
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
    this.smartness = Math.random() / 200;
    this.inTheDepths = false;
    this.spawn = 0;
    this.name = "chicken";
  }
  update() {
    // dirv = rotational velocity?
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
    if (this.run > 0) {
      this.x += Math.sin(this.dir) * -1;
      this.y += Math.cos(this.dir) * -1;
      let target = this.getTile();
      if (target == null || (target.elevation <= 1 && Math.random() > this.smartness) || target.item == Item.rail) {
        this.x += Math.sin(this.dir) * 1;
        this.y += Math.cos(this.dir) * 1;
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

    // Find the tile containing the chicken.  If the chicken is off the board,
    // in the depths, or has negative age, then this chicken dies.
    // (Shouldn't we return at this point?)
    var tile = this.getTile();
    if (tile == null || tile.elevation == Elevation.depths || this.age <= 0) {
      animals.animals.splice(animals.animals.indexOf(this), 1);
    }
    // Check if the chicken has fallen into the depths.
    if (tile != null && tile.elevation <= 1 &&
      this.run <= 0 && !this.inTheDepths) {
      this.age -= 0.01;
      this.stopped = true;
      this.inTheDepths = true;
      audio.plop.play();
    }

    // If the chicken isn't running, then it can turn around.
    if (tile != null && this.stopped && this.run <= 0) {
      this.canTurn = true;
    }
    // If the chicken is in the shallows then it can't turn or move fast.
    if (tile != null && tile.elevation <= Elevation.shallow) {
      this.run--;
      this.canTurn = false;
    }

    // If the chicken finds some alfalfa that has grown for at least a
    // few moments.
    if (tile != null && tile.item == Item.alfalfa && tile.age > 10 && this.spawn <= 0) {
      tile.item = 0;
      if (Math.random() > 0.25) {
        tile.item = Item.egg;
        this.spawn = 100;
        game_eggs++;
        tile.age = 0;
      }
    }
    this.age -= 0.001;
    this.spawn--;
  }
  getImage() {
    return IMAGES.CHICKEN.getFrameAtIndex(0);
  }
  getTile() {
    // Return the tile containing this animal or NULL if the animal is off board.
    if (board[Math.floor(this.y / TILE_SIZE)] == null) return null;
    return board[Math.floor(this.y / TILE_SIZE)][Math.floor(this.x / TILE_SIZE)] || null;
  }
  static trySpawn() {
    if (Math.random() > 0.9995 && animals.animals.length < 10) {
      // Make a few attempts to find a valid location for a chicken.  If
      // we find a spot above water, place a chicken.
      for (var i = 0; i < 16; i++) {
        var x = Math.random() * BOARD_SIZE_PX;
        var y = Math.random() * BOARD_SIZE_PX;
        var tile = board[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
        if (tile.elevation >= Elevation.beach) {
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
