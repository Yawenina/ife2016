/**
 * Created by yawenina on 3/12/17.
 */
//工具函数
const loggerElem = $$('.loggers');
const maxShipCount = 4,
      chargeRate = 2,
      dischargeRate = 5;
const commandsMapping = {
  "add": "新建",
  "flying": "开始飞行",
  "stop": "停止飞行",
  "destroy": "销毁"
};

function $$(selector, context = document) {
  return context.querySelector(selector);
}
function logger(msg) {
  let p = document.createElement("p");
  p.textContent = msg;
  loggerElem.appendChild(p);
}


//飞船


function Spaceship(id) {
  this.id = id;
  this.energy = 100;
  this.state = 'stop';
  this.elem = null;
}

Spaceship.prototype.charge = function () {
  if (this.energy === 100) return;
  let timer = setInterval(() => {
    if (this.energy === 100) {
      clearInterval(timer);
    } else {
      this.energy += chargeRate;
      this.elem.textContent = `${this.energy}%`;
    }
  }, 1000)
};

Spaceship.prototype.discharge = function () {
  let timer = setInterval(() => {
    if (this.energy === 0) {
      clearInterval(timer);
      this.stop();
    } else {
      this.energy -= dischargeRate;
      this.elem.textContent = `${this.energy}%`;
    }
  }, 1000)
};

Spaceship.prototype.destory = function () {
  
};

Spaceship.prototype.flying = function () {
  this.state = "flying";
  this.elem.style.animationPlayState = "running";
  this.discharge();
};

Spaceship.prototype.stop = function () {
  this.state = "stop";
  this.elem.style.animationPlayState = "paused";
  this.charge();
};

Spaceship.prototype.listen = function (command) {
  if (command.id === this.id.toString() && command.command !== "add") {
    this[command.command]();
  }
};

//指挥官： 单例模式
var commander = {
  spaceships: new Array(maxShipCount),
  getAvailableShipId: function () {
    for (let i = 0, len = this.spaceships.length; i < len; i++) {
      if (this.spaceships[i] === undefined) {
        return i;
      }
    }
    return false;
  },
  sendCommand: function (command) {
    if (typeof command.id === "undefined") {
      let id = this.getAvailableShipId();
      if (typeof id === "number") {
        command.id = id;
        this.spaceships[command.id] = true;
      } else {
        return false;
      }
    }
    if (command.command === "destroy") {
      this.spaceships[id] = undefined;
    }

    logger(`指挥官：${commandsMapping[command.command]}${command.id}号飞船`);
    mediator.listen(command);
  }
};

var mediator = {
  //注册所有飞船
  spaceships: [],
  listen: function (command) {
    if (command.command === "add") {
      this.addShip(command.id);
    }
    for (let i = 0, len = this.spaceships.length; i < len; i++) {
      this.spaceships[i].listen(command);
    }
  },
  addShip: function (id) {
    //增加飞船
    this.spaceships[id] = new Spaceship(id);
    this.addCommandPanel(id);
    this.addShipDOM(id);
    this.spaceships[id].elem = $$(`.spaceship-${id}`);
  },
  addShipDOM: function (id) {
    let ship = document.createElement("div");
    ship.style.top = `${(id + 1) * 35}px`;
    ship.className = `spaceship spaceship-${id}`;
    $$(".space").appendChild(ship);
  },
  addCommandPanel: function (id) {
    let content = `
        <span>对${id}号飞船下达指令：</span>
        <button class="flying" data-command="flying" data-id="${id}">开始飞行</button>
        <button class="stop" data-command="stop" data-id="${id}">停止飞行</button>
        <button class="destroy" data-command="destroy" data-id="${id}">销毁</button>
    `;
    let li =document.createElement('li');
    li.innerHTML = content;
    $$(".commands-list").appendChild(li);
  },
  handleClick: function (e) {
    let id = e.target.dataset.id,
        command = e.target.dataset.command;
    commander.sendCommand({id, command});
  },
};

$$('.commands-panel').addEventListener('click', mediator.handleClick);
