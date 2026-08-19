"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../utils/razorpay-utils'),
  normalizeDate = _require.normalizeDate;
module.exports = function subscriptionsApi(api) {
  var BASE_URL = "/subscriptions",
    MISSING_ID_ERROR = "Subscription ID is mandatory";
  return {
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Creates a Subscription
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
    fetch: function fetch(subscriptionId, callback) {
      /*
       * Fetch a Subscription given Subcription ID
       *
       * @param {String} subscriptionId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      var url = "".concat(BASE_URL, "/").concat(subscriptionId);
      return api.get({
        url: url
      }, callback);
    },
    update: function update(subscriptionId, params, callback) {
      /*
       * Update Subscription
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId);
      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      return api.patch({
        url: url,
        data: params
      }, callback);
    },
    pendingUpdate: function pendingUpdate(subscriptionId, callback) {
      /*
       * Update a Subscription
       *
       * @param {String} subscription
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/retrieve_scheduled_changes");
      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      return api.get({
        url: url
      }, callback);
    },
    cancelScheduledChanges: function cancelScheduledChanges(subscriptionId, callback) {
      /*
       * Cancel Schedule  
       *
       * @param {String} subscription
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/cancel_scheduled_changes");
      if (!subscriptionId) {
        return Promise.reject("Subscription Id is mandatory");
      }
      return api.post({
        url: url
      }, callback);
    },
    pause: function pause(subscriptionId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      /*
       * Pause a subscription 
       *
       * @param {String} subscription
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/pause");
      if (!subscriptionId) {
        return Promise.reject("Subscription Id is mandatory");
      }
      return api.post({
        url: url,
        data: params
      }, callback);
    },
    resume: function resume(subscriptionId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      /*
       * resume a subscription 
       *
       * @param {String} subscription
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/resume");
      if (!subscriptionId) {
        return Promise.reject("Subscription Id is mandatory");
      }
      return api.post({
        url: url,
        data: params
      }, callback);
    },
    deleteOffer: function deleteOffer(subscriptionId, offerId, callback) {
      /*
      * Delete an Offer Linked to a Subscription
      *
      * @param {String} subscription
      * @param {String} offerId
      * @param {Function} callback
      *
      * @return {Promise}
      */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/").concat(offerId);
      if (!subscriptionId) {
        return Promise.reject("Subscription Id is mandatory");
      }
      return api["delete"]({
        url: url
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Get all Subscriptions
       *
       * @param {Object} params
       * @param {Funtion} callback
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
    cancel: function cancel(subscriptionId) {
      var cancelAtCycleEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      /*
       * Cancel a subscription given id and optional cancelAtCycleEnd
       *
       * @param {String} subscription
       * @param {Boolean} cancelAtCycleEnd
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/cancel");
      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      return api.post(_objectSpread({
        url: url
      }, cancelAtCycleEnd && {
        data: {
          cancel_at_cycle_end: 1
        }
      }), callback);
    },
    createAddon: function createAddon(subscriptionId, params, callback) {
      /*
       * Creates addOn for a given subscription
       *
       * @param {String} subscriptionId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/addons");
      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      return api.post({
        url: url,
        data: _objectSpread({}, params)
      }, callback);
    },
    createRegistrationLink: function createRegistrationLink() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Creates a Registration Link
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
      return api.post({
        url: '/subscription_registration/auth_links',
        data: params
      }, callback);
    }
  };
};