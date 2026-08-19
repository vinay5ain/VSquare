'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate;
module.exports = function (api) {
  var BASE_URL = "/accounts";
  return {
    create: function create(params, accountId, callback) {
      var payload = {
        url: '/webhooks',
        data: params
      };
      if (accountId) {
        payload = {
          version: 'v2',
          url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks"),
          data: params
        };
      }
      return api.post(payload, callback);
    },
    edit: function edit(params, webhookId, accountId, callback) {
      if (accountId && webhookId) {
        return api.patch({
          version: 'v2',
          url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/").concat(webhookId),
          data: params
        }, callback);
      }
      return api.put({
        url: "/webhooks/".concat(webhookId),
        data: params
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var accountId = arguments.length > 1 ? arguments[1] : undefined;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip;
      if (from) {
        from = normalizeDate(from);
      }
      if (to) {
        to = normalizeDate(to);
      }
      count = Number(count) || 10;
      skip = Number(skip) || 0;
      var data = _objectSpread(_objectSpread({}, params), {}, {
        from: from,
        to: to,
        count: count,
        skip: skip
      });
      if (accountId) {
        return api.get({
          version: 'v2',
          url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/"),
          data: data
        }, callback);
      }
      return api.get({
        url: "/webhooks",
        data: data
      }, callback);
    },
    fetch: function fetch(webhookId, accountId, callback) {
      return api.get({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/").concat(webhookId)
      }, callback);
    },
    "delete": function _delete(webhookId, accountId, callback) {
      return api["delete"]({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/").concat(webhookId)
      }, callback);
    }
  };
};