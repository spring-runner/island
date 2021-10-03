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
}

class Animal {
  constructor() {
    this.x = 0;
    this.y = 0;
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
  trySpawn() {
    if (Math.random() > 0.99) {

    }
  }
}
