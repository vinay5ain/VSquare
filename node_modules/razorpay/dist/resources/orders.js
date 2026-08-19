'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["currency"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _require = require('../utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate;
module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip,
        authorized = params.authorized,
        receipt = params.receipt;
      var expand;
      if (from) {
        from = normalizeDate(from);
      }
      if (to) {
        to = normalizeDate(to);
      }
      if (params.hasOwnProperty("expand[]")) {
        expand = {
          "expand[]": params["expand[]"]
        };
      }
      count = Number(count) || 10;
      skip = Number(skip) || 0;
      authorized = authorized;
      return api.get({
        url: '/orders',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip,
          authorized: authorized,
          receipt: receipt,
          expand: expand
        }
      }, callback);
    },
    fetch: function fetch(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }
      return api.get({
        url: "/orders/".concat(orderId)
      }, callback);
    },
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      var currency = params.currency,
        otherParams = _objectWithoutProperties(params, _excluded);
      currency = currency || 'INR';
      var data = Object.assign(_objectSpread({
        currency: currency
      }, otherParams));
      return api.post({
        url: '/orders',
        data: data
      }, callback);
    },
    edit: function edit(orderId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }
      return api.patch({
        url: "/orders/".concat(orderId),
        data: params
      }, callback);
    },
    fetchPayments: function fetchPayments(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }
      return api.get({
        url: "/orders/".concat(orderId, "/payments")
      }, callback);
    },
    fetchTransferOrder: function fetchTransferOrder(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }
      return api.get({
        url: "/orders/".concat(orderId, "/?expand[]=transfers&status")
      }, callback);
    },
    viewRtoReview: function viewRtoReview(orderId, callback) {
      return api.post({
        url: "/orders/".concat(orderId, "/rto_review")
      }, callback);
    },
    editFulfillment: function editFulfillment(orderId) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      return api.post({
        url: "/orders/".concat(orderId, "/fulfillment"),
        data: param
      });
    }
  };
};