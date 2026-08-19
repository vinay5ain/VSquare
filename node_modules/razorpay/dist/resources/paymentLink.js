"use strict";

/*
 * DOCS: https://razorpay.com/docs/payment-links/
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate;
module.exports = function paymentLinkApi(api) {
  var BASE_URL = "/payment_links",
    MISSING_ID_ERROR = "Payment Link ID is mandatory";
  return {
    create: function create(params, callback) {
      /*
       * Creates Payment Link.
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL;
      return api.post({
        url: url,
        data: params
      }, callback);
    },
    cancel: function cancel(paymentLinkId, callback) {
      /*
       * Cancels issued paymentLink
       *
       * @param {String} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentLinkId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(paymentLinkId, "/cancel");
      return api.post({
        url: url
      }, callback);
    },
    fetch: function fetch(paymentLinkId, callback) {
      /*
       * Fetches paymentLink entity with given id
       *
       * @param {String} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentLinkId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(paymentLinkId);
      return api.get({
        url: url
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Fetches multiple paymentLink with given query options
       *
       * @param {Object} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip,
        url = BASE_URL;
      if (from) {
        from = normalizeDate(from);
      }
      if (to) {
        to = normalizeDate(to);
      }
      count = Number(count) || 10;
      skip = Number(skip) || 0;
      return api.get({
        url: url,
        data: _objectSpread(_objectSpread({}, params), {}, {
          from: from,
          to: to,
          count: count,
          skip: skip
        })
      }, callback);
    },
    edit: function edit(paymentLinkId, params, callback) {
      return api.patch({
        url: "".concat(BASE_URL, "/").concat(paymentLinkId),
        data: params
      }, callback);
    },
    notifyBy: function notifyBy(paymentLinkId, medium, callback) {
      /*
       * Send/re-send notification for invoice by given medium
       * 
       * @param {String} paymentLinkId
       * @param {String} medium
       * @param {Function} callback
       * 
       * @return {Promise}
       */

      if (!paymentLinkId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      if (!medium) {
        return Promise.reject("`medium` is required");
      }
      var url = "".concat(BASE_URL, "/").concat(paymentLinkId, "/notify_by/").concat(medium);
      return api.post({
        url: url
      }, callback);
    }
  };
};