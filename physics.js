///////////////////////////////////////////////////////////////////////////////
//
//  Smooth random curves
//

function lump(x) {
  return (x - 1) ** 2 * (x + 1) ** 2;
}

function Curve() {
  this.t_prev = 0;
  this.t_near = 1;
  this.t_next = 2;

  this.v_prev = Math.random();
  this.v_near = Math.random();
  this.v_next = Math.random();
}

Curve.prototype.val = function(t) {
  var t_near = Math.round(t);

  if (t_near > this.t_near + 3) {
    // Complete reset
    this.t_prev = t_near - 1;
    this.v_prev = Math.random();
    this.t_near = t_near;
    this.v_near = Math.random();
    this.t_next = t_near + 1;
    this.v_next = Math.random();
  } else {
    // Shift forward
    while (t_near > this.t_near) {
      this.t_prev = this.t_near;
      this.v_prev = this.v_near;
      this.t_near = this.t_next;
      this.v_near = this.v_next;
      this.t_next = this.t_near + 1;
      this.v_next = Math.random();
    }
  }

  var w0 = lump(t - this.t_prev);
  var w1 = lump(t - this.t_near);
  var w2 = lump(t - this.t_next);

  return (w0 * this.v_prev + w1 * this.v_near + w2 * this.v_next) / (w0 + w1 + w2);
}

///////////////////////////////////////////////////////////////////////////////
//
//  Wind speed and direction
//

function Wind() {
  this.wind_speed_curve0 = new Curve();
  this.wind_speed_curve1 = new Curve();
  this.wind_direction_curve = new Curve();
}

Wind.prototype.speed = function(t) {
  return (1 * this.wind_speed_curve0.val(t * 0.0382) +
          4 * this.wind_speed_curve1.val(t * 0.00273) ** 4);
}

Wind.prototype.direction = function(t) {
  return 10 * this.wind_direction_curve.val(t * 0.0561);
}

///////////////////////////////////////////////////////////////////////////////
//
//  Wave simulation
//

const wave_radius = 250;

function Wave() {
  this.reset();
}

Wave.prototype.reset = function() {
  // Restart the wave at a random point on a wide circle around the world.
  var angle = 2 * Math.PI * Math.random();
  this.x = Math.cos(angle) * wave_radius;
  this.y = Math.sin(angle) * wave_radius;
}

Wave.prototype.simulate = function(dt, speed, direction) {
  this.x += speed * Math.cos(direction);
  this.y += speed * Math.sin(direction);

  // If the wave was blow outside the simulation circle, reset it.
  var radius = Math.hypot(this.x, this.y);
  if (radius > wave_radius) {
    this.reset();
  }
}

function Waves(wind, num_waves) {
  this.wind = wind;
  this.waves = [];
  for (var i = 0; i < num_waves; ++i) {
    this.waves.push(new Wave());
  }
}

Waves.prototype.simulate = function(dt) {
  var speed = this.wind.speed(game_time);
  var direction = this.wind.direction(game_time);
  for (var i = 0; i < this.waves.length; ++i) {
    this.waves[i].simulate(dt, speed, direction);
  }
}
