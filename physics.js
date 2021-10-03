///////////////////////////////////////////////////////////////////////////////
//
//  Smooth random curves
//

function lump(x) {
  const lump_coeff = Math.log(1/2) / Math.log(3/4);

  if (Math.abs(x) > 1) {
    return 0.0;
  } else {
    return ((1 - x) * (1 + x)) ** lump_coeff;
  }
}

///////////////////////////////////////////////////////////////////////////////
//
//  Wind speed and direction
//

function Wind() {
  this.mid_time = -100;  // Time associated with the middle entry in lists
  this.vx_list = [];  // velocity at mid_time - 1, mid_time, mid_time + 1
  this.vy_list = [];
  this.vx = 0;
  this.vy = 0;
  this.ux = 0;
  this.uy = 0;
  this.theta = 0;
  this.speed = 0;
  this.shift_time = 30.0;
  this.typical_velocity = 20;
}

Wind.prototype.update = function(t) {
  t /= this.shift_time;

  var round_time = Math.round(t);

  this.mid_time = Math.max(this.mid_time, round_time - 3);

  while (round_time > this.mid_time) {
    var u = 1 - Math.random();  // never 0
    var v = 1 - Math.random();
    var n1 = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v);
    var n2 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    this.vx_list.push(n1 * this.typical_velocity);
    this.vy_list.push(n2 * this.typical_velocity);

    if (this.vx_list.length > 3) {
      this.vx_list.shift();
      this.vy_list.shift();
    }

    this.mid_time += 1;
  }

  var w0 = lump(t - (this.mid_time - 1));
  var w1 = lump(t - this.mid_time);
  var w2 = lump(t - (this.mid_time + 1));
  var w = w0 + w1 + w2;

  this.vx = (w0 * this.vx_list[0] + w1 * this.vx_list[1] + w2 * this.vx_list[2]) / w;
  this.vy = (w0 * this.vy_list[0] + w1 * this.vy_list[1] + w2 * this.vy_list[2]) / w;
  this.speed = Math.hypot(this.vx, this.vy);
  this.theta = Math.atan2(this.vy, this.vx);
  this.ux = this.vx / this.speed;
  this.uy = this.vy / this.speed;
}

///////////////////////////////////////////////////////////////////////////////
//
//  Wave simulation
//

const wave_radius = 600;

function Wave(wind) {
  this.wind = wind;
  this.prev_square = null;
  this.square = null;
  this.reset();
}

Wave.prototype.reset = function() {
  // Move the position to a random point on the outer circle.
  var angle = 2 * Math.PI * Math.random();
  this.x = Math.cos(angle) * wave_radius;
  this.y = Math.sin(angle) * wave_radius;
  this.prev_square = null;
  this.square = null;
}

Wave.prototype.simulate = function(dt) {
  this.x += dt * this.wind.vx;
  this.y += dt * this.wind.vy;

  // If the wave was blown outside the simulation circle, reset it.
  if (Math.hypot(this.x, this.y) > wave_radius) {
    this.reset();
  }

  // Remember where the wave was previously.
  this.prev_square = this.square;

  // Figure out what square the wave is on now.
  var col = Math.floor(boardSize / 2 + this.x / TILE_SIZE);
  var row = Math.floor(boardSize / 2 - this.y / TILE_SIZE);
  if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
    this.square = board[row][col];
  } else {
    this.square = null;
  }
}

///////////////////////////////////////////////////////////////////////////////
//
//  Erosion simulation
//

function erode(lo, hi) {
  var stability = 0.1;  // chance land defeats water
  if (hi.elevation == Elevation.lava) {
    stability = 1.0;
  } else if (hi.item == Item.alfalfa) {
    stability = 0.2;
  } else if (hi.item == Item.wall) {
    stability = 0.9;
  }

  if (Math.random() < stability) {
    // land wins!
    lo.elevation += 1;
  } else {
    // water wins...
    audio.wave.play();
    hi.item = Item.none;  // destroy any item
    if (hi.elevation >= lo.elevation + 2) {
      lo.elevation += 1;  // some land falls into the water
    }
    hi.elevation -= 1;
  }
}

///////////////////////////////////////////////////////////////////////////////
//
//  Overall simulation
//

function initPhysics() {
  wind = new Wind();
  wave_list = [];
  for (var i = 0; i < 50; ++i) {
    wave_list.push(new Wave(wind));
  }
}

function simulatePhysics(dt) {
  wind.update(game_time);

  for (var i = 0; i < this.wave_list.length; ++i) {
    var wave = wave_list[i];

    // Simulate the wave.
    wave.simulate(dt);

    if (wave.prev_square && wave.square &&
        wave.square.elevation >= Elevation.beach) {
      // If the wave came from the water, then cause erosion.
      if (wave.prev_square.elevation <= Elevation.shallows) {
        erode(wave.prev_square, wave.square);
      }
      wave.reset();
    }
  }
}
