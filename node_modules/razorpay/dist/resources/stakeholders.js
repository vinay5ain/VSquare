'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["file"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
module.exports = function (api) {
  var BASE_URL = "/accounts";
  return {
    create: function create(accountId, params, callback) {
      return api.post({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders"),
        data: params
      }, callback);
    },
    edit: function edit(accountId, stakeholderId, params, callback) {
      return api.patch({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId),
        data: params
      }, callback);
    },
    fetch: function fetch(accountId, stakeholderId, callback) {
      return api.get({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId)
      }, callback);
    },
    all: function all(accountId, callback) {
      return api.get({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders")
      }, callback);
    },
    uploadStakeholderDoc: function uploadStakeholderDoc(accountId, stakeholderId, params, callback) {
      var file = params.file,
        rest = _objectWithoutProperties(params, _excluded);
      return api.postFormData({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId, "/documents"),
        formData: _objectSpread({
          file: file.value
        }, rest)
      }, callback);
    },
    fetchStakeholderDoc: function fetchStakeholderDoc(accountId, stakeholderId, callback) {
      return api.get({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId, "/documents")
      }, callback);
    }
  };
};