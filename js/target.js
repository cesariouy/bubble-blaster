(function(root) {
  var BubbleBlaster = root.BubbleBlaster = (root.BubbleBlaster || {});

  var Target = BubbleBlaster.Target = function Target(pos, vel) {
    this.RADIUS = 20;
    this.COLOR = 'white';
    BubbleBlaster.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
  };

  Target.inherits(BubbleBlaster.MovingObject);

  Target.randomTarget = function(dimX, dimY) {
    var x = Math.floor((Math.random() * dimX) + 1);
    var y = Math.floor((Math.random() * dimY) + 1);
    var vel = randomVec();
    return new Target([x, y], vel);
  };

  function randomVec() {
    while(true) {
      var dx = (Math.random() * 7 - 3);
      var dy = (Math.random() * 7 - 3);
      return [dx, dy];
    }
  }

})(this);
