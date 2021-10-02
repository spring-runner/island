
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

var wind_speed_curve0 = new Curve();
var wind_speed_curve1 = new Curve();
var wind_direction_curve = new Curve();

function windSpeed(t) {
  return (5 * wind_speed_curve0.val(t * 0.0382) +
          20 * wind_speed_curve1.val(t * 0.00273) ** 4);
}

function windDirection(t) {
  return 100 * wind_direction_curve(t * 0.0561);
}
