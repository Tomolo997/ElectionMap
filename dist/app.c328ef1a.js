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
})({"app.js":[function(require,module,exports) {
var mapboxAccessToken = 'pk.eyJ1IjoidG9tYXpvdnNlbmphayIsImEiOiJja2lxYTRhd28wZGoxMnhwamF3MTI1YjA5In0.cCRWR0uclCv1ecYzmJ0Y_w';
var map = L.map('map', {
  maxZoom: 4.5,
  minZoom: 4.5,
  dragging: false,
  doubleClickZoom: false
}).setView([37.8, -96], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);
L.geoJson(statesData).addTo(map); //////////////////////////////////////////////////////////////

var mapa = L.map('mapALaska', {
  maxZoom: 3,
  minZoom: 3,
  dragging: false,
  doubleClickZoom: false
}).setView([64, -157], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mapa);
L.geoJson(statesData).addTo(mapa); //havai

var mapH = L.map('mapHawai', {
  dragging: false,
  doubleClickZoom: false
}).setView([20.761906909670278, -157.5727520449764], 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mapH);
L.geoJson(statesData).addTo(mapH); //////////////////////////////////////////////////////////////

var USAmap = document.querySelector('.mapOfUSA');
var states = Array.from(USAmap.getElementsByTagName('path'));
var mapOfAlaska = document.querySelector('.mapOfAlaska');
var statesAlaska = Array.from(mapOfAlaska.getElementsByTagName('path'));
var mapOfHawai = document.querySelector('.mapOfHawai');
var statesHawai = Array.from(mapOfHawai.getElementsByTagName('path'));
var controls = document.querySelectorAll('.leaflet-top');

for (var i = 0; i < controls.length; i++) {
  var element = controls[i];
  element.remove();
}

console.log(controls);
states.splice(1, 1, statesAlaska[1]);
states.splice(11, 1, statesHawai[11]);
console.log(states);
var trumpProg = document.querySelector('.progressBar--trump');
var bidenProg = document.querySelector('.progressBar--biden');
var trumpOnScreenVotes = document.querySelector('.electoralPoints-Trump');
var bidenOnScreenVotes = document.querySelector('.electoralPoints-Biden');
var originalStates = {
  statesPath: states,
  statesElectoral: [],
  statesNames: [],
  electoralVotes: {},
  trumpCountriesWon: [],
  bidenCountriesWon: []
}; //adding the classes and ids and so on
//electoral votes for every country

for (var _i = 0; _i < statesData.features.length; _i++) {
  var _element = statesData.features[_i];
  originalStates.statesElectoral.push(_element.properties.electoralVotes); //my key = country
  //my value = electoral votes

  originalStates.electoralVotes[_element.properties.name] = _element.properties.electoralVotes;
}

for (var _i2 = 0; _i2 < statesData.features.length - 1; _i2++) {
  var _element2 = statesData.features[_i2];
  originalStates.statesNames.push(_element2.properties.name);
} //vsakemu pathu dodati svojo kurčevo državo


for (var _i3 = 0; _i3 < states.length; _i3++) {
  var _element3 = states[_i3];

  _element3.setAttribute('id', originalStates.statesNames[_i3]);

  _element3.setAttribute('fill', 'transparent');

  _element3.setAttribute('data-votes', originalStates.statesElectoral[_i3]);
}

var clicked = 0;
var trumpVotes = 0;
var bidenVotes = 0; //adding the classes and ids and so on
//
//
//
//clicked events

states.forEach(function (el) {
  el.addEventListener('click', function (e) {
    if (e.target.getAttribute('fill') === '#3388ff') {
      e.target.setAttribute('fill', '#ff0000'); //add to the countries won
    } else {
      e.target.setAttribute('fill', '#3388ff'); //add to the biden victory
    } // id = ime
    // dataset.electoral => electoral votes of the state
    //če ima fill enak moder, dodaj k bidenu


    if (e.target.getAttribute('fill') === '#3388ff') {
      e.target.setAttribute('data-candidate', 'biden'); //vse države soe.target.id že podane k obema kandidatoma
    }

    if (e.target.getAttribute('fill') === '#ff0000') {
      console.log('Trumps Country ');
      e.target.setAttribute('data-candidate', 'trump');
    } //get all the paths = >


    var bidenVOOtes = [0];
    var trumpVOotes = [0];

    for (var _i4 = 0; _i4 < states.length; _i4++) {
      var _element4 = states[_i4];

      if (_element4.dataset.candidate === 'biden') {
        bidenVOOtes.push(+_element4.dataset.votes);
      } else if (_element4.dataset.candidate === 'trump') {
        trumpVOotes.push(+_element4.dataset.votes);
      }
    }

    console.log(bidenVOOtes);
    console.log(trumpVOotes);
    var trumpVotesFinal = trumpVOotes.reduce(function (acc, cur) {
      return acc + cur;
    });
    console.log('trump Votes ' + trumpVotesFinal);
    var bidenVotesFinal = bidenVOOtes.reduce(function (acc, cur) {
      return acc + cur;
    });
    console.log('biden Votes ' + bidenVotesFinal); // width => je enako votson trumpProg bidenProg
    //novi width je tist , kateri je trenuten votes

    trumpProg.style.width = trumpVotesFinal * 1.86 + 'px';
    bidenProg.style.width = bidenVotesFinal * 1.86 + 'px';
    trumpOnScreenVotes.textContent = trumpVotesFinal;
    bidenOnScreenVotes.textContent = bidenVotesFinal;
  });
}); //To do :
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49555" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map