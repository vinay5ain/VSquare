'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var axios = require('axios')["default"];
var nodeify = require('./utils/nodeify');
var _require = require('./utils/razorpay-utils'),
  isNonNullObject = _require.isNonNullObject;
var allowedHeaders = {
  "X-Razorpay-Account": "",
  "Content-Type": "application/json"
};
function getValidHeaders(headers) {
  var result = {};
  if (!isNonNullObject(headers)) {
    return result;
  }
  return Object.keys(headers).reduce(function (result, headerName) {
    if (allowedHeaders.hasOwnProperty(headerName)) {
      result[headerName] = headers[headerName];
    }
    return result;
  }, result);
}
function normalizeError(err) {
  throw {
    statusCode: err.response.status,
    error: err.response.data.error
  };
}
var API = /*#__PURE__*/function () {
  function API(options) {
    _classCallCheck(this, API);
    _defineProperty(this, "version", 'v1');
    this.rq = axios.create(this._createConfig(options));
  }
  return _createClass(API, [{
    key: "_createConfig",
    value: function _createConfig(options) {
      var config = {
        baseURL: options.hostUrl,
        headers: Object.assign({
          'User-Agent': options.ua
        }, getValidHeaders(options.headers))
      };
      if (options.key_id && options.key_secret) {
        config.auth = {
          username: options.key_id,
          password: options.key_secret
        };
      }
      if (options.oauthToken) {
        config.headers = _objectSpread({
          'Authorization': "Bearer ".concat(options.oauthToken)
        }, config.headers);
      }
      return config;
    }
  }, {
    key: "getEntityUrl",
    value: function getEntityUrl(params) {
      return params.hasOwnProperty('version') ? "/".concat(params.version).concat(params.url) : "/".concat(this.version).concat(params.url);
    }
  }, {
    key: "get",
    value: function get(params, cb) {
      return nodeify(this.rq.get(this.getEntityUrl(params), {
        params: params.data
      })["catch"](normalizeError), cb);
    }
  }, {
    key: "post",
    value: function post(params, cb) {
      return nodeify(this.rq.post(this.getEntityUrl(params), params.data)["catch"](normalizeError), cb);
    }

    // postFormData method for file uploads.
  }, {
    key: "postFormData",
    value: function postFormData(params, cb) {
      return nodeify(this.rq.post(this.getEntityUrl(params), params.formData, {
        'headers': {
          'Content-Type': 'multipart/form-data'
        }
      })["catch"](normalizeError), cb);
    }
  }, {
    key: "put",
    value: function put(params, cb) {
      return nodeify(this.rq.put(this.getEntityUrl(params), params.data)["catch"](normalizeError), cb);
    }
  }, {
    key: "patch",
    value: function patch(params, cb) {
      return nodeify(this.rq.patch(this.getEntityUrl(params), params.data)["catch"](normalizeError), cb);
    }
  }, {
    key: "delete",
    value: function _delete(params, cb) {
      return nodeify(this.rq["delete"](this.getEntityUrl(params))["catch"](normalizeError), cb);
    }
  }]);
}();
module.exports = API;