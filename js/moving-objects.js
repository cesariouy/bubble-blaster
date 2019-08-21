(function(root) {
  var BubbleBlaster = root.BubbleBlaster = (root.BubbleBlaster || {});

  var MovingObject = BubbleBlaster.MovingObject = function MovingObject(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function() {
    this.pos = [(this.pos[0] + this.vel[0]), (this.pos[1] + this.vel[1])];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var distance = Math.sqrt(
      Math.pow(
        (this.pos[0] - otherObject.pos[0]), 2
      ) + Math.pow(
        (this.pos[1] - otherObject.pos[1]), 2
      )
    );

    if (this.radius + otherObject.radius > distance) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.wrap = function(dimX, dimY) {
    var maxes = [dimX, dimY];

    for (i = 0; i < 2; i++ ) {
      if ((this.pos[i] <= i) || (this.pos[i] >= maxes[i])) {
        this.pos[i] = (this.pos[i] <= 0 ? maxes[i] : 0);
      }
    }
  };

})(this);
