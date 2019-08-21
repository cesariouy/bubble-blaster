(function(root) {
  var BubbleBlaster = root.BubbleBlaster = (root.BubbleBlaster || {});

  var Bullet = BubbleBlaster.Bullet = function Bullet(pos, vel) {
    this.COLOR = 'lime';
    this.RADIUS = 2;
    BubbleBlaster.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
  }

  Bullet.inherits(BubbleBlaster.MovingObject);

})(this);
