var animals = new Animals();

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
    for (var i = 0; i < this.animals.length; i++) {
      var a = this.animals[i];
      gameBoard.drawImage(a.getImage(), a.x, a.y);
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
  }
  update() {

  }
  getImage() {
    return IMAGES.CHICKEN;
  }
  static trySpawn() {
    if (Math.random() > 0.99) {
      var c = new Chicken();
      c.x = Math.random() * 768;
      c.y = Math.random() * 768;
      animals.push(c);
    }
  }
}
