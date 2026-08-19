"use strict";

/*
 * DOCS: https://razorpay.com/docs/invoices/
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate;
module.exports = function invoicesApi(api) {
  var BASE_URL = "/invoices",
    MISSING_ID_ERROR = "Invoice ID is mandatory";

  /**
   * Invoice entity gets used for both Payment Links and Invoices system.
   * Few of the methods are only meaningful for Invoices system and
   * calling those for against/for a Payment Link would throw
   * Bad request error.
   */

  return {
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Creates invoice of any type(invoice|link|ecod).
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
    edit: function edit(invoiceId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      /*
       * Patches given invoice with new attributes
       *
       * @param {String} invoiceId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(invoiceId);
      if (!invoiceId) {
        return Promise.reject("Invoice ID is mandatory");
      }
      return api.patch({
        url: url,
        data: params
      }, callback);
    },
    issue: function issue(invoiceId, callback) {
      /*
       * Issues drafted invoice
       *
       * @param {String} invoiceId
       * @param {Function} callback
       * 
       * @return {Promise}
       */

      if (!invoiceId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(invoiceId, "/issue");
      return api.post({
        url: url
      }, callback);
    },
    "delete": function _delete(invoiceId, callback) {
      /*
       * Deletes drafted invoice
       *
       * @param {String} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!invoiceId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(invoiceId);
      return api["delete"]({
        url: url
      }, callback);
    },
    cancel: function cancel(invoiceId, callback) {
      /*
       * Cancels issued invoice
       * 
       * @param {String} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!invoiceId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(invoiceId, "/cancel");
      return api.post({
        url: url
      }, callback);
    },
    fetch: function fetch(invoiceId, callback) {
      /*
       * Fetches invoice entity with given id
       *
       * @param {String} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!invoiceId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(invoiceId);
      return api.get({
        url: url
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Fetches multiple invoices with given query options
       *
       * @param {Object} invoiceId
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
    notifyBy: function notifyBy(invoiceId, medium, callback) {
      /*
       * Send/re-send notification for invoice by given medium
       * 
       * @param {String} invoiceId
       * @param {String} medium
       * @param {Function} callback
       * 
       * @return {Promise}
       */

      if (!invoiceId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      if (!medium) {
        return Promise.reject("`medium` is required");
      }
      var url = "".concat(BASE_URL, "/").concat(invoiceId, "/notify_by/").concat(medium);
      return api.post({
        url: url
      }, callback);
    }
  };
};