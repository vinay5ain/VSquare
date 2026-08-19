'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = function (api) {
  var BASE_URL = "/settlements";
  return {
    createOndemandSettlement: function createOndemandSettlement() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Create on-demand settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = "".concat(BASE_URL, "/ondemand");
      return api.post({
        url: url,
        data: params
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Fetch all settlements
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip,
        url = BASE_URL;
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
    fetch: function fetch(settlementId, callback) {
      /*
       * Fetch a settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!settlementId) {
        return Promise.reject("settlement Id is mandatroy");
      }
      return api.get({
        url: "".concat(BASE_URL, "/").concat(settlementId)
      }, callback);
    },
    fetchOndemandSettlementById: function fetchOndemandSettlementById(settlementId) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var expand;
      /*
       * Fetch On-demand Settlements by ID
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!settlementId) {
        return Promise.reject("settlment Id is mandatroy");
      }
      if (param.hasOwnProperty("expand[]")) {
        expand = {
          "expand[]": param["expand[]"]
        };
      }
      return api.get({
        url: "".concat(BASE_URL, "/ondemand/").concat(settlementId),
        data: {
          expand: expand
        }
      }, callback);
    },
    fetchAllOndemandSettlement: function fetchAllOndemandSettlement() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
       * Fetch all demand settlements
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var expand;
      var from = params.from,
        to = params.to,
        count = params.count,
        skip = params.skip,
        url = "".concat(BASE_URL, "/ondemand");
      if (params.hasOwnProperty("expand[]")) {
        expand = {
          "expand[]": params["expand[]"]
        };
      }
      return api.get({
        url: url,
        data: _objectSpread(_objectSpread({}, params), {}, {
          from: from,
          to: to,
          count: count,
          skip: skip,
          expand: expand
        })
      }, callback);
    },
    reports: function reports() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      /*
      * Settlement report for a month
      *
      * @param {Object} params
      * @param {Function} callback
      *
      * @return {Promise}
      */

      var day = params.day,
        count = params.count,
        skip = params.skip,
        url = "".concat(BASE_URL, "/recon/combined");
      return api.get({
        url: url,
        data: _objectSpread(_objectSpread({}, params), {}, {
          day: day,
          count: count,
          skip: skip
        })
      }, callback);
    }
  };
};