'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var _require = require('../utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate;
var ID_REQUIRED_MSG = '`payment_id` is mandatory',
  BASE_URL = '/payments';
module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip;
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
      return api.get({
        url: "".concat(BASE_URL),
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip,
          expand: expand
        }
      }, callback);
    },
    fetch: function fetch(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var expand;
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      if (params.hasOwnProperty("expand[]")) {
        expand = {
          "expand[]": params["expand[]"]
        };
      }
      return api.get({
        url: "".concat(BASE_URL, "/").concat(paymentId),
        data: {
          expand: expand
        }
      }, callback);
    },
    capture: function capture(paymentId, amount, currency, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      if (!amount) {
        throw new Error('`amount` is mandatory');
      }
      var payload = {
        amount: amount
      };

      /**
       * For backward compatibility,
       * the third argument can be a callback
       * instead of currency.
       * Set accordingly.
       */
      if (typeof currency === 'function' && !callback) {
        callback = currency;
        currency = undefined;
      } else if (typeof currency === 'string') {
        payload.currency = currency;
      }
      return api.post({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/capture"),
        data: payload
      }, callback);
    },
    createPaymentJson: function createPaymentJson(params, callback) {
      var url = "".concat(BASE_URL, "/create/json"),
        rest = _extends({}, (_objectDestructuringEmpty(params), params)),
        data = Object.assign(rest);
      return api.post({
        url: url,
        data: data
      }, callback);
    },
    createRecurringPayment: function createRecurringPayment(params, callback) {
      return api.post({
        url: "".concat(BASE_URL, "/create/recurring"),
        data: params
      }, callback);
    },
    edit: function edit(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      return api.patch({
        url: "".concat(BASE_URL, "/").concat(paymentId),
        data: params
      }, callback);
    },
    refund: function refund(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      return api.post({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/refund"),
        data: params
      }, callback);
    },
    fetchMultipleRefund: function fetchMultipleRefund(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      /*
       * Fetch multiple refunds for a payment
       *
       * @param {String} paymentId 
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip,
        url = "".concat(BASE_URL, "/").concat(paymentId, "/refunds");
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
    fetchRefund: function fetchRefund(paymentId, refundId, callback) {
      if (!paymentId) {
        throw new Error('payment Id` is mandatory');
      }
      if (!refundId) {
        throw new Error('refund Id` is mandatory');
      }
      return api.get({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/refunds/").concat(refundId)
      }, callback);
    },
    fetchTransfer: function fetchTransfer(paymentId, callback) {
      /*
       * Fetch transfers for a payment
       *
       * @param {String} paymentId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {
        throw new Error('payment Id` is mandatory');
      }
      return api.get({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/transfers")
      }, callback);
    },
    transfer: function transfer(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      return api.post({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/transfers"),
        data: params
      }, callback);
    },
    bankTransfer: function bankTransfer(paymentId, callback) {
      if (!paymentId) {
        return Promise.reject(ID_REQUIRED_MSG);
      }
      return api.get({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/bank_transfer")
      }, callback);
    },
    fetchCardDetails: function fetchCardDetails(paymentId, callback) {
      if (!paymentId) {
        return Promise.reject(ID_REQUIRED_MSG);
      }
      return api.get({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/card")
      }, callback);
    },
    fetchPaymentDowntime: function fetchPaymentDowntime(callback) {
      return api.get({
        url: "".concat(BASE_URL, "/downtimes")
      }, callback);
    },
    fetchPaymentDowntimeById: function fetchPaymentDowntimeById(downtimeId, callback) {
      /*
       * Fetch Payment Downtime
       *
       * @param {String} downtimeId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!downtimeId) {
        return Promise.reject("Downtime Id is mandatory");
      }
      return api.get({
        url: "".concat(BASE_URL, "/downtimes/").concat(downtimeId)
      }, callback);
    },
    otpGenerate: function otpGenerate(paymentId, callback) {
      /*
       * OTP Generate
       *
       * @param {String} paymentId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {
        return Promise.reject("payment Id is mandatory");
      }
      return api.post({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/otp_generate")
      }, callback);
    },
    otpSubmit: function otpSubmit(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      /*
       * OTP Submit
       *
       * @param {String} paymentId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {
        return Promise.reject("payment Id is mandatory");
      }
      return api.post({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/otp/submit"),
        data: params
      }, callback);
    },
    otpResend: function otpResend(paymentId, callback) {
      /*
       * OTP Resend
       *
       * @param {String} paymentId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {
        return Promise.reject("payment Id is mandatory");
      }
      return api.post({
        url: "".concat(BASE_URL, "/").concat(paymentId, "/otp/resend")
      }, callback);
    },
    createUpi: function createUpi() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Initiate a payment
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/create/upi"),
        rest = _extends({}, (_objectDestructuringEmpty(params), params)),
        data = Object.assign(rest);
      return api.post({
        url: url,
        data: data
      }, callback);
    },
    validateVpa: function validateVpa() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Validate the VPA
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/validate/vpa"),
        rest = _extends({}, (_objectDestructuringEmpty(params), params)),
        data = Object.assign(rest);
      return api.post({
        url: url,
        data: data
      }, callback);
    },
    fetchPaymentMethods: function fetchPaymentMethods(callback) {
      /*
       * Validate the VPA
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "/methods";
      return api.get({
        url: url
      }, callback);
    }
  };
};