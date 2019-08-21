(function(root) {
  var BubbleBlaster = root.BubbleBlaster = (root.BubbleBlaster || {});

  var Bub = BubbleBlaster.Bub = function Bub(pos) {
    this.RADIUS = 12;
    this.COLOR = 'aqua';
    this.vel = [0, (Math.PI / 2) * 3];
    BubbleBlaster.MovingObject.call(this, pos, this.vel, this.RADIUS, this.COLOR);
  };

  Bub.inherits(BubbleBlaster.MovingObject);

  Bub.prototype.move = function() {
    var x = Math.cos(this.vel[1]) * this.vel[0];
    var y = Math.sin(this.vel[1]) * this.vel[0];
    this.pos[0] += x;
    this.pos[1] += y;
  };

  Bub.prototype.power = function(impulse) {
    this.vel[0] += impulse;
    if (this.vel[0] < 0) { this.vel[0] = 0; }
    if (this.vel[0] > 4) { this.vel[0] = 4; }
  };

  Bub.prototype.rotate = function(increment) {
    this.vel[1] += increment;
  };

  Bub.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, this.vel[1] + 0.5, this.vel[1] - 0.5 );
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  Bub.prototype.fireBullet = function() {
    var x = Math.cos(this.vel[1]) * 6;
    var y = Math.sin(this.vel[1]) * 6;
    return new BubbleBlaster.Bullet(this.pos, [x, y]);
  };

})(this);
