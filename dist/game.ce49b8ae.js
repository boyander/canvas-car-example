// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils/angle2rad.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var angle2rad = function angle2rad(angle) {
  return Math.PI / 180 * angle;
};

exports.default = angle2rad;
},{}],"src/utils/checkLimits.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var checkLimits = function checkLimits(pos) {
  if (pos.x < 600 && pos.x > -50 && pos.y < 400 && pos.y > -20) {
    return true;
  }

  return false;
};

exports.default = checkLimits;
},{}],"src/Actor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actor = void 0;

var Actor =
/** @class */
function () {
  function Actor(posisiton) {
    this.position = posisiton;
  }

  return Actor;
}();

exports.Actor = Actor;
},{}],"assets/ferrari.png":[function(require,module,exports) {
module.exports = "/ferrari.79b3f129.png";
},{}],"src/actors/Car.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable max-len */

/* eslint-disable lines-between-class-members */

/* eslint-disable import/extensions */

/* eslint-disable import/no-unresolved */

var angle2rad_1 = __importDefault(require("../utils/angle2rad"));

var checkLimits_1 = __importDefault(require("../utils/checkLimits"));

var Actor_1 = require("../Actor");

var ferrariImg = require("../../assets/ferrari.png");

var Car =
/** @class */
function (_super) {
  __extends(Car, _super);

  function Car(initial_pos, size) {
    if (initial_pos === void 0) {
      initial_pos = {
        x: 100,
        y: 100
      };
    }

    if (size === void 0) {
      size = {
        w: 10,
        h: 15
      };
    }

    var _this = _super.call(this, initial_pos) || this;

    _this.carSize = size;
    _this.carColor = "red";
    _this.angle = 0;
    _this.angleSpeed = 0;
    _this.carSpeed = 0;
    _this.carAcceleration = 0;
    _this.image = new Image();
    _this.image.src = ferrariImg;
    return _this;
  }

  Car.prototype.update = function (frame) {
    this.angle += this.angleSpeed;
    this.angleSpeed *= 0.9; // en cada frame, reducimos su velocidad a un 90%

    this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration; // la velocidad se va reduciendo pero la aceleración es constante

    var newPos = {
      x: this.position.x + Math.cos(angle2rad_1.default(this.angle)) * this.carSpeed,
      y: this.position.y + Math.sin(angle2rad_1.default(this.angle)) * this.carSpeed // el giro es con respecto a la velocidad del ejeX y el ejeY

    };

    if (checkLimits_1.default(newPos)) {
      this.position = newPos;
    }
  };

  Car.prototype.draw = function (ctx) {
    // draw car
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle2rad_1.default(this.angle));
    ctx.fillStyle = this.carColor;
    ctx.rotate(angle2rad_1.default(180));
    ctx.drawImage(this.image, -25, -13.5, 50, 25);
    ctx.fillRect(-this.carSize.h / 2, -this.carSize.w / 2, this.carSize.h, this.carSize.w);
  };

  Car.prototype.keyboardEventDown = function (key) {
    if (key === "ArrowLeft") {
      this.angleSpeed = -4;
    } else if (key === "ArrowRight") {
      this.angleSpeed = 4;
    } else if (key === "ArrowUp") {
      this.carAcceleration = 1;
    } else if (key === "ArrowDown") {
      this.carAcceleration = -1;
    }
  };

  Car.prototype.keyboardEventUp = function (key) {
    if (key === "ArrowUp") {
      this.carAcceleration = 0;
    } else if (key === "ArrowDown") {
      this.carAcceleration = 0;
    }
  };

  return Car;
}(Actor_1.Actor);

exports.default = Car;
},{"../utils/angle2rad":"src/utils/angle2rad.ts","../utils/checkLimits":"src/utils/checkLimits.ts","../Actor":"src/Actor.ts","../../assets/ferrari.png":"assets/ferrari.png"}],"src/actors/Barrier.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Barrier = void 0;
/* eslint-disable max-len */

/* eslint-disable lines-between-class-members */

/* eslint-disable import/extensions */

/* eslint-disable import/no-unresolved */

var Actor_1 = require("../Actor");

var angle2rad_1 = __importDefault(require("../utils/angle2rad"));

var CircuitManager_1 = require("../state/CircuitManager");

var BARRIER_TOUCH_LIMIT = 30;

var Barrier =
/** @class */
function (_super) {
  __extends(Barrier, _super);

  function Barrier(pos, bw, angle, coche, barrier_index) {
    if (pos === void 0) {
      pos = {
        x: 0,
        y: 0
      };
    }

    if (bw === void 0) {
      bw = 60;
    }

    if (angle === void 0) {
      angle = 0;
    }

    var _this = _super.call(this, pos) || this;

    _this.pos = pos;
    _this.barrierWidth = bw;
    _this.angle = angle;
    _this.touched = false;
    _this.coche = coche;
    _this.barrier_index = barrier_index;
    return _this;
  }

  Barrier.prototype.update = function (frame) {
    if (CircuitManager_1.Circuit.current_barrier === this.barrier_index) {
      var barrier_pos = this.position; // 2

      var car_pos = this.coche.position; // 1
      // Euclidean distance: https://es.wikipedia.org/wiki/Distancia_euclidiana

      var distance = Math.round(Math.sqrt(Math.pow(barrier_pos.x - car_pos.x, 2) + Math.pow(barrier_pos.y - car_pos.y, 2)));

      if (distance <= BARRIER_TOUCH_LIMIT) {
        this.touched = true;
        CircuitManager_1.Circuit.setLastTouchedBarrier(this.barrier_index);
      }
    }
  };

  Barrier.prototype.draw = function (ctx) {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(angle2rad_1.default(this.angle));
    this.touched ? ctx.strokeStyle = "green" : ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-this.barrierWidth / 2, 0);
    ctx.lineTo(this.barrierWidth / 2, 0);
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 3, 0, angle2rad_1.default(360));
    ctx.closePath();
    ctx.stroke();
    ctx.fillText("(" + this.barrier_index + ")", 0, 10);
  };

  Barrier.prototype.keyboardEventDown = function (key) {};

  Barrier.prototype.keyboardEventUp = function (key) {};

  return Barrier;
}(Actor_1.Actor);

exports.Barrier = Barrier;
},{"../Actor":"src/Actor.ts","../utils/angle2rad":"src/utils/angle2rad.ts","../state/CircuitManager":"src/state/CircuitManager.ts"}],"src/state/CircuitManager.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_circuit = exports.Circuit = void 0;

var Actor_1 = require("../Actor");

var Barrier_1 = require("../actors/Barrier");

var angle2rad_1 = __importDefault(require("../utils/angle2rad"));

var CircuitManager =
/** @class */
function (_super) {
  __extends(CircuitManager, _super);

  function CircuitManager(coche) {
    var _this = _super.call(this, {
      x: 10,
      y: 20
    }) || this;

    _this.barriers = [];
    _this.current_barrier = 0;
    _this.total_laps = 1;
    _this.chrono = 0;
    _this.laps = 0;
    var num = 20;
    var center = {
      x: 300,
      y: 200
    };
    var radius = 200;

    for (var i = 0; i < num; i++) {
      var angle = 360 / num * i + 90;

      _this.barriers.push(new Barrier_1.Barrier({
        x: center.x + Math.sin(angle2rad_1.default(angle)) * radius,
        y: center.y + Math.cos(angle2rad_1.default(angle)) * radius
      }, 80, -angle + 90, coche, i));
    }

    return _this;
  }

  CircuitManager.prototype.update = function (frame) {
    var barreras_tocadas = this.barriers.filter(function (b) {
      return b.touched;
    }).length;
    var total_barriers = this.barriers.length;

    if (barreras_tocadas === total_barriers) {
      this.nextLap();
    } else {//   console.log(
      //     `QUEDAN ${total_barriers - barreras_tocadas} barreras por tocar`
      //   );
    }

    this.chrono += 1 / 25;
  };

  CircuitManager.prototype.setLastTouchedBarrier = function (idx) {
    this.current_barrier = idx + 1;
  };

  CircuitManager.prototype.nextLap = function () {
    // Reset barriers state
    this.barriers.forEach(function (b) {
      b.touched = false;
    }); // Set next barrier to be touched to zero

    this.current_barrier = 0; // add one lap

    this.laps += 1;

    if (this.laps === this.total_laps) {
      alert("COMPLELTED " + this.get_chrono());
    }
  };

  CircuitManager.prototype.get_chrono = function () {
    return this.chrono.toFixed(2);
  };

  CircuitManager.prototype.draw = function (ctx) {
    ctx.translate(this.position.x, this.position.y);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("LAPS: " + (this.laps + 1) + "/" + this.total_laps + " CHRONO " + this.get_chrono(), 0, 0);
  };

  return CircuitManager;
}(Actor_1.Actor);

var create_circuit = function create_circuit(car) {
  exports.Circuit = new CircuitManager(car);
};

exports.create_circuit = create_circuit;
},{"../Actor":"src/Actor.ts","../actors/Barrier":"src/actors/Barrier.ts","../utils/angle2rad":"src/utils/angle2rad.ts"}],"src/game.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/extensions */

/* eslint-disable import/no-unresolved */

var Car_1 = __importDefault(require("./actors/Car"));

var CircuitManager_1 = require("./state/CircuitManager");

window.addEventListener("load", function () {
  // Get a reference to canvas dom tag
  var canvas = document.getElementById("root");
  var ctx = canvas.getContext("2d");
  var main_car = new Car_1.default({
    x: 500,
    y: 200
  }); // SINGLETON -> gestor de estado del circuito y barreras del mismo

  CircuitManager_1.create_circuit(main_car);

  var actors = __spreadArray([main_car, CircuitManager_1.Circuit], CircuitManager_1.Circuit.barriers); // Game render loop


  var fps = 25;
  var frame = 0;
  setInterval(function () {
    // Clear the canvas
    ctx.clearRect(0, 0, 600, 400); // Update game actor objects

    actors.forEach(function (actor) {
      return actor.update(frame);
    }); // Draw game actor objects

    actors.forEach(function (actor) {
      ctx.save();
      actor.draw(ctx);
      ctx.restore();
    }); // Update current frame to make animations work

    frame += 1;
  }, 1000 / fps);
  window.addEventListener("keydown", function (e) {
    actors.forEach(function (actor) {
      if (actor.keyboardEventDown) {
        actor.keyboardEventDown(e.key);
      }
    });
  });
  window.addEventListener("keyup", function (e) {
    actors.forEach(function (actor) {
      return actor.keyboardEventUp && actor.keyboardEventUp(e.key);
    });
  });
});
},{"./actors/Car":"src/actors/Car.ts","./state/CircuitManager":"src/state/CircuitManager.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62661" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/game.ts"], null)
//# sourceMappingURL=/game.ce49b8ae.js.map