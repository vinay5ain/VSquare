'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var mocker = require('../../test/mocker'),
  equal = require('deep-equal'),
  chai = require('chai'),
  assert = chai.assert,
  _require = require("../../dist/utils/razorpay-utils"),
  prettify = _require.prettify,
  getTestError = _require.getTestError;
var runCallbackCheckTest = function runCallbackCheckTest(params) {
  var apiObj = params.apiObj,
    methodName = params.methodName,
    methodArgs = params.methodArgs,
    mockerParams = params.mockerParams;
  it("Checks if the passed api callback gets called", function (done) {
    mocker.mock(mockerParams);
    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs).concat([function (err) {
      done();
    }]));
  });
  it("Checks for error flow", function (done) {
    mocker.mock(_objectSpread(_objectSpread({}, mockerParams), {}, {
      replyWithError: true
    }));
    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs).concat([function (err) {
      assert.ok(!!err, "Error callback called with error");
      done();
    }]));
  });
  it("Checks if the api call returns a Promise", function (done) {
    mocker.mock(mockerParams);
    var retVal = apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs));
    retVal && typeof retVal.then === "function" ? done() : done(getTestError("Invalid Return Value", String("Promise"), retVal));
  });
};
var runURLCheckTest = function runURLCheckTest(params) {
  var apiObj = params.apiObj,
    methodName = params.methodName,
    methodArgs = params.methodArgs,
    expectedUrl = params.expectedUrl,
    mockerParams = params.mockerParams;
  it("Checks if the URL is formed correctly", function (done) {
    mocker.mock(mockerParams);
    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs).concat([function (err, resp) {
      var respData = resp.__JUST_FOR_TESTS__;
      if (respData.url === expectedUrl) {
        assert.ok(true, "URL Matched");
        done();
      } else {
        done(getTestError("URL Mismatch", expectedUrl, respData.url));
      }
    }]));
  });
};
var runParamsCheckTest = function runParamsCheckTest(params) {
  var apiObj = params.apiObj,
    methodName = params.methodName,
    methodArgs = params.methodArgs,
    expectedParams = params.expectedParams,
    mockerParams = params.mockerParams,
    testTitle = params.testTitle;
  testTitle = testTitle || "Validates URL and Params";
  it(testTitle, function (done) {
    mocker.mock(mockerParams);
    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs)).then(function (resp) {
      var respData = resp.__JUST_FOR_TESTS__,
        respParams = respData[respData.method === "GET" ? "requestQueryParams" : "requestBody"];
      if (equal(respParams, expectedParams)) {
        assert.ok(true, "Params Matched");
      } else {
        return getTestError("Params Mismatch", expectedParams, respParams);
      }
    }, function (err) {
      return new Error(prettify(err));
    }).then(function (err) {
      done(err);
    });
  });
};
var runCommonTests = function runCommonTests(params) {
  var apiObj = params.apiObj,
    methodName = params.methodName,
    methodArgs = params.methodArgs,
    expectedUrl = params.expectedUrl,
    expectedParams = params.expectedParams,
    mockerParams = params.mockerParams;
  runURLCheckTest(_objectSpread({}, params));
  if (expectedParams) {
    runParamsCheckTest(_objectSpread({}, params));
  }
  runCallbackCheckTest(_objectSpread({}, params));
};
module.exports = {
  runCallbackCheckTest: runCallbackCheckTest,
  runParamsCheckTest: runParamsCheckTest,
  runURLCheckTest: runURLCheckTest,
  runCommonTests: runCommonTests
};