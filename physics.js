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

  // console.log(t, this.t_prev, this.t_near, this.t_next);

  var w0 = lump(t - this.t_prev);
  var w1 = lump(t - this.t_near);
  var w2 = lump(t - this.t_next);

  return (w0 * this.v_prev + w1 * this.v_near + w2 * this.v_next) / (w0 + w1 + w2);
}

function curveTest() {
  var curve = new Curve();
  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 100;
  canvas.style.border = "1px solid black";
  document.body.appendChild(canvas);
  var context = canvas.getContext("2d");
  var t_start = 5.0;
  var t_end = 50.0;
  context.beginPath();
  context.moveTo(0, 0);
  for (var i = 0; i < canvas.width; ++i) {
    var t = t_start + (t_end - t_start) * i / canvas.width;
    context.lineTo(i, 100 * curve.val(t));
  }
  context.stroke();
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
  return (4 * this.wind_speed_curve0.val(t * 0.0982) +
          4 * this.wind_speed_curve1.val(t * 0.00273) ** 4);
}

Wind.prototype.direction = function(t) {
  return 10 * this.wind_direction_curve.val(t * 0.0561);
}

///////////////////////////////////////////////////////////////////////////////
//
//  Wave simulation
//

<<<<<<< HEAD
const wave_radius = 750;
=======
const wave_radius = 250;
>>>>>>> f9921ccc87ad89ddfe01af6cb02e8510aff8b3f0

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
