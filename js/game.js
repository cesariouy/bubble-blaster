(function(root) {
  var intervalID;
  var startTime;
  var endTime;

  var BubbleBlaster = root.BubbleBlaster = (root.BubbleBlaster || {});

  var Game = BubbleBlaster.Game = function Game(ctx) {
    this.DIM_X = root.innerWidth;
    this.DIM_Y = root.innerHeight * 0.6;

    this.ctx = ctx;
    this.targets = [];
    this.bullets = [];

    var gameArea = this.DIM_X * this.DIM_Y;
    var numTargets = gameArea / 50000;

    for (var i = 0; i < numTargets; i++) {
      this.targets.push(BubbleBlaster.Target.randomTarget(this.DIM_X, this.DIM_Y));
    }

    this.bub = new BubbleBlaster.Bub([this.DIM_X / 2, this.DIM_Y / 2]);
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i].draw(this.ctx);
    }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }

    this.bub.draw(this.ctx);

    this.drawStats();
  };

  Game.prototype.drawStats = function() {
    var currentTime = new Date().getTime();
    var elapsedTime = (currentTime - startTime) / 1000;
    var statsX = this.DIM_X - 140;
    var statsY = this.DIM_Y - 20;

    this.ctx.font = '16px courier';
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText('time: ' + elapsedTime.toString() + 's', statsX, statsY);
  };

  Game.prototype.move = function() {
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i].move();
    }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }

    this.bub.move();
  };

  Game.prototype.wrapObjects = function() {
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i].wrap(this.DIM_X, this.DIM_Y);
    }

    this.bub.wrap(this.DIM_X, this.DIM_Y);
  };

  Game.prototype.step = function() {
    this.checkKeys();
    this.move();
    this.wrapObjects();
    this.checkBounds();
    this.draw();
    this.checkCollisions();

    if (this.targets.length === 0) {
      this.end();
      this.draw();
      this.ctx.font = '24px courier';
      this.ctx.fillStyle = 'yellow';

      var winMsgX = (this.DIM_X / 2) - 200;
      var winMsgY = this.DIM_Y / 2;

      this.ctx.fillText('you win! now beat your time', winMsgX, winMsgY);
    }
  };

  Game.prototype.checkKeys = function() {
    var that = this;

    if (key.isPressed('up')) {
      this.bub.power(0.25);
    }

    if (key.isPressed('down')) {
      this.bub.power(-0.25);
    }

    if (key.isPressed('left')) {
      this.bub.rotate(Math.PI / -32);
    }

    if (key.isPressed('right')) {
      this.bub.rotate(Math.PI / 32);
    }
  };

  Game.prototype.start = function() {
    var that = this;
    startTime = new Date().getTime();
    that.bindKeyHandlers();

    intervalID = root.setInterval(function() {
      that.step();
    }, 17);
  };

  Game.prototype.end = function() {
    root.clearInterval(intervalID);
    endTime = new Date().getTime();
  };

  Game.prototype.checkCollisions = function() {
    for (var i = this.targets.length - 1; i >= 0; i--) {
      if (this.targets[i].isCollidedWith(this.bub)) {
        this.end();
        this.ctx.font = '24px courier';
        this.ctx.fillStyle = 'yellow';

        var loseMsgX = (this.DIM_X / 2) - 200;
        var loseMsgY = this.DIM_Y / 2;
        
        this.ctx.fillText('you lose. hit enter to retry', loseMsgX, loseMsgY);
      }

      for (var j = this.bullets.length - 1; j >= 0; j--) {
        if (this.targets[i].isCollidedWith(this.bullets[j])) {
          this.bullets.splice(j, 1);
          this.targets.splice(i, 1);
          break;
        }
      }
    }
  };

  Game.prototype.checkBounds = function() {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      if (Math.abs(this.bullets[i].pos[0] - (this.DIM_X / 2)) > (this.DIM_X / 2)) {
        this.bullets.splice(i, 1);
      } else if (Math.abs(this.bullets[i].pos[1] - (this.DIM_Y / 2)) > (this.DIM_Y / 2)) {
        this.bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('space', function() {
      if (that.bub.vel[0] != 0) {
        that.bullets.push(that.bub.fireBullet());
      }
    });
  };
})(this);
