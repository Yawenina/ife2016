/**
 * Created by yawenina on 10/2/16.
 */
const spaceshipSpeed = 2;
const chargeRate = 1;
const dischargeRate = 2;
// 飞船
function Spaceship(id) {
  this.id = id;
  this.currState = 'stop';
  this.power = 100;
  this.deg = 0;
  this.timer = null;
}

//动力系统
Spaceship.prototype.dynamicSystem = function () {
  let self = this;
  //飞行
  let fly = function () {
    self.timer = setInterval(function(){
      self.deg += spaceshipSpeed;
      if (self.deg >= 360) self.deg = 0;
      AnimationUtil.fly(self.id, self.deg);e
    }, 200);
    console.log(`Spaceship # ${self.id} is flying`);
  };

  //停止
  let stop = function(){
    clearInterval(self.timer);
    console.log(`Spaceship # ${self.id} stops.`);
  };

  return {
    fly,
    stop
  }
};

//能源系统
Spaceship.prototype.powerSystem = function () {
  let self = this;
  //充电
  let charge = function(){
    let timer = setInterval(function(){
      if (self.currState == 'fly' || self.currState == 'destroy') {
        clearInterval(timer);
        return false;
      }
      if (self.power >= 100) {
        clearInterval(timer);
        self.power = 100;
        return false;
      }
      self.power += chargeRate;
      AnimationUtil.updatePower(self.id, self.power);
    }, 200);
    console.log(`Spaceship # ${self.id} is charging.`);
  };

  //耗电
  let discharge = function () {
    let timer = setInterval(function(){
      if (self.currState == 'stop' || self.currState == 'destroy') {
        clearInterval(timer);
        return false;
      }
      if (self.power <= 0) {
        clearInterval(timer);
        self.power = 0;
        self.stateSystem().changeState('stop');
        return false;
      }
      self.power -= dischargeRate;
      AnimationUtil.updatePower(self.id, self.power);
    }, 200)
    console.log(`Spaceship # ${self.id} is discharging.`);
  };

  return {
    charge,
    discharge
  }
};

Spaceship.prototype.stateSystem = function (state) {
  let self = this;
  let states = {
    fly: function(){
      self.currState = 'fly';
      self.dynamicSystem().fly();
      self.powerSystem().discharge();
    },
    stop: function(){
      self.currState = 'stop';
      self.dynamicSystem().stop();
      self.powerSystem().charge();
    },
    destroy: function(){
      self.currState = 'destroy';
      AnimationUtil.destroy(self.id);
      self.mediator.remove(self);
    }
  };

  let changeState = function (state) {
    states[state]();
    console.log(`Spaceship # ${self.id} state is ${state}`);
  };

  return {
    changeState
  }
};

Spaceship.prototype.signalSystem = function (msg) {
  let self = this;
  return {
    receive: function(msg){
      if (self.currState !== msg.command && self.id === msg.id) {
        self.stateSystem().changeState(msg.command)
      }
    }
  }
};

//指挥官
function Commander() {
  this.id = 'nina';
  this.msgs = [];
  this.mediator = null;
};

Commander.prototype.send = function (msg) {
  this.mediator.send(msg);
  this.msgs.push(msg);
};

//Mediator
function Mediator() {
  let spaceships = [];
  let commander = null;

  let register = function (obj) {
    if (obj instanceof Commander) {
      commander = obj;
      obj.mediator = this;
      console.log(`mediator register commander ${obj.id}`);
      return true;
    }
    if (obj instanceof Spaceship) {
      spaceships[obj.id] = obj;
      obj.mediator = this;
      console.log(`mediator register spaceship ${obj.id}`);
    }
    console.log('mediator register failed');
    return false;
  };

  let send = function (msg) {
    let self = this;
    setTimeout(function () {
      let success = Math.random() > 0.3 ? true : false
      if (success) {
        if (msg.command == 'create') {
          self.create(msg);
          return true;
        }
        for (let key in spaceships) {
          spaceships[key].signalSystem().receive(msg)
        }
      } else {
        console.log('send failed')
      }
    }, 1000)
  };
  
  let remove = function (obj) {
    if (obj instanceof Spaceship) {
      console.log(`destroy spaceship ${obj.id}`);
      spaceships[obj.id] = undefined;
      delete obj;
      return true;
    }
    console.log('mediator remove failed');
    return false;
  };
  
  let create = function (msg) {
    if (spaceships[msg.id] !== undefined) {
      console.log('spaceship already exists');
      return false;
    }
    let spaceship = new Spaceship(msg.id);
    this.register(spaceship);
    AnimationUtil.create(msg.id, spaceship.power);
  };

  let getSpaceships = function () {
    return spaceships;
  };

  return {
    register,
    send,
    remove,
    create,
    getSpaceships
  }
}

//动画
let AnimationUtil = (function (id, deg) {
  let fly = function (id, deg) {
    document.getElementById(`spaceship-${id}`).style.transform = 'rotate(' + deg + 'deg)'
  };
  let updatePower = function (id, power) {
    document.getElementById(`spaceship-${id}`).textContent = power;
  };
  let create = function (id, power) {
    let spaceshipDiv = document.createElement('div');
    spaceshipDiv.className = 'spaceship';
    spaceshipDiv.id = `spaceship-${id}`;
    spaceshipDiv.textContent = power;
    document.querySelector('.track-1').appendChild(spaceshipDiv)
  };
  let destroy = function (id) {
    let getSpaceshipDiv = document.getElementById(`spaceship-${id}`);
    getSpaceshipDiv.parentNode.removeChild(getSpaceshipDiv);
  }

  return {
    fly,
    updatePower,
    create,
    destroy
  }
}())


function handleCommandClick(commander) {
  document.querySelector('.command-list').addEventListener('click', function(e){
    let id = e.target.parentNode.id
    let command = e.target.className
    commander.send({id, command})
  }, false)
}

window.onload = function () {
  var commander = new Commander()
  var mediator = new Mediator()
  mediator.register(commander)
  handleCommandClick(commander)
}




