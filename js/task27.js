/**
 * Created by yawenina on 10/20/16.
 */
let dynamicTypeObj = {
  "normal": [20, 5],
  "middle": [60, 8],
  "fast": [100, 10]
}

let powerTypeObj = {
  "low": 2,
  "middle": 5,
  "quick": 8
}

function Spaceship(id, dynamicType, powerType) {
  this.id = id;
  this.power = 100;
  this.currState = 'stop';
  this.deg = 0;
  this.spaceshipSpeed = dynamicTypeObj[dynamicType][0];
  this.dischargeRate = dynamicTypeObj[dynamicType][1];
  this.chargeRate = powerTypeObj[powerType];
  self.timer = null;
}

Spaceship.prototype.dynamicSystem = function () {
  var self = this;
  function fly() {
    self.timer = setInterval(() => {
      self.deg += self.spaceshipSpeed;
      if (self.deg >= 360) self.deg = 0;
      AnimationUtil.fly(self.id, self.deg);
    }, 1000)
    MessagePanel.print(self.id + "号飞船起飞");
  }

  function stop() {
    clearInterval(this.timer);
    MessagePanel.print(this.id + "号飞船已经停止");
  }

  return {
    fly,
    stop
  }
};

Spaceship.prototype.powerSystem = function () {
  let self = this;
  let charge = function () {
    let timer = setInterval(function () {
      if (self.currState == "fly" || self.currState == "destroy") {
        clearInterval(timer);
        return false;
      }

      if (self.power >= 100) {
        clearInterval(timer);
        self.power = 100;
        return false;
      }

      self.power += self.chargeRate;
      AnimationUtil.updatePower(self.id, self.power)
    }, 200)
    MessagePanel.print(self.id + "号飞船正在充电")
  };

  let discharge = function () {
    let timer = setInterval(function () {
      if (self.currState == "stop" || self.currState == "destroy") {
        clearInterval(timer);
        return false;
      }

      if (self.power <= 0) {
        clearInterval(timer);
        self.power = 0;
        return false;
      }

      self.power -= dischargeRate;
      AnimationUtil.updatePower(self.id, self.power);
    });
    MessagePanel.print(self.id + "号飞船正在放电");
  }

  return {
    charge,
    discharge
  }
};

Spaceship.prototype.stateSystem = function (state) {
  let states = {
    fly: function () {
      this.currState = "fly";
      this.dynamicSystem().fly();
      this.powerSystem().updatePower();
    },
    stop: function () {
      this.currState = "stop";
      this.dynamicSystem().stop();
      this.powerSystem().updatePower();
    },
    destroy: function () {
      this.currState = "destroy";
      AnimationUtil.destroy(this.id);
      this.mediator.remove(this);
    }
  }

  let changeState = function (state) {
    states[state]();
    MessagePanel.print(this.id + '号飞船状态为' + this.currState);
  }

  return {
    changeState
  };
};

Spaceship.prototype.signalSystem = function () {
  let receive = function (msg) {
    if (this.currState !== msg.command && this.id === msg.id) {
      this.stateSystem().changeState(msg.command)
    }
  }

  return {
    receive
  }
}
let createBtn = document.getElementById('create-spaceship')

function createHandler() {
  let dynamicType = document.querySelector('input[name="speedType"]:checked').value
  let powerType = document.querySelector('input[name="powerType"]:checked').value
  let spaceship = new Spaceship(1, dynamicType, powerType)
  console.log(spaceship)
}
createBtn.addEventListener('click', createHandler)

