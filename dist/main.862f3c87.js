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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: "A",
  logoType: 'text',
  url: "https://www.acfun.cn",
  name: "acfun"
}, {
  logo: "B",
  logoType: 'text',
  url: "https://www.bilibili.com",
  name: "bilibili"
}];

var modify = function modify() {};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n            <div class=\"logo\">".concat(node.logo, "</div>\n            <div class=\"details\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-details\"></use>\n                </svg>\n            </div>\n        </div>\n        <div class=\"link\">").concat(node.name, "</div>\n    </li>")).insertBefore($lastLi);
    $li.click(function () {
      window.open(node.url);
    });
    $li.on('click', '.details', function (e) {
      e.stopPropagation();
      $("#shade").removeClass("hide");
      $(".c3").removeClass("hide");
      $(".c3 button").click(function () {
        $("#shade").addClass("hide");
        $(".c3").addClass("hide");
      });
      $(".c3").on('click', '.close', function () {
        hashMap.splice(index, 1);
        render();
        window.location.reload();
      });
      $(".c3").on('click', '.permit', function () {
        if ($(".c3 .url input[type='text']").val() && $(".c3 .name input[type='text']").val()) {
          var url = $(".c3 .url input[type='text']").val();
          var name = $(".c3 .name input[type='text']").val();

          if (url.indexOf('https://') !== 0) {
            url = "https://" + url;
          }

          hashMap.splice(index, 1, {
            logo: name[0],
            logoType: 'text',
            name: name,
            url: url
          });
          $(".url input[type='text']").val("");
          $(".name input[type='text']").val("");
          render();
          window.location.reload();
        }
      });
    });
  });
};

render();
$(".addButton").click(function () {
  $("#shade").removeClass("hide");
  $(".c2").removeClass("hide");
});
$(".c2 button").click(function () {
  $("#shade").addClass("hide");
  $(".c2").addClass("hide");
});
$("#modal .permit").click(function () {
  if ($(".url input[type='text']").val() && $(".name input[type='text']").val()) {
    var url = $(".url input[type='text']").val();
    var name = $(".name input[type='text']").val();

    if (url.indexOf('https://') !== 0) {
      url = "https://" + url;
    }

    hashMap.push({
      logo: name[0],
      logoType: 'text',
      name: name,
      url: url
    });
    render();
    $(".url input[type='text']").val("");
    $(".name input[type='text']").val("");
  }
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.862f3c87.js.map