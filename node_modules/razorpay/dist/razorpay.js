'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var API = require('./api');
var pkg = require('../package.json');
var _require = require('./utils/razorpay-utils'),
  _validateWebhookSignature = _require.validateWebhookSignature;
var Razorpay = /*#__PURE__*/function () {
  function Razorpay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Razorpay);
    var key_id = options.key_id,
      key_secret = options.key_secret,
      oauthToken = options.oauthToken,
      headers = options.headers;
    if (!key_id && !oauthToken) {
      throw new Error('`key_id` or `oauthToken` is mandatory');
    }
    this.key_id = key_id;
    this.key_secret = key_secret;
    this.oauthToken = oauthToken;
    this.api = new API({
      hostUrl: 'https://api.razorpay.com',
      ua: "razorpay-node@".concat(Razorpay.VERSION),
      key_id: key_id,
      key_secret: key_secret,
      headers: headers,
      oauthToken: oauthToken
    });
    this.addResources();
  }
  return _createClass(Razorpay, [{
    key: "addResources",
    value: function addResources() {
      Object.assign(this, {
        accounts: require('./resources/accounts')(this.api),
        stakeholders: require('./resources/stakeholders')(this.api),
        payments: require('./resources/payments')(this.api),
        refunds: require('./resources/refunds')(this.api),
        orders: require('./resources/orders')(this.api),
        customers: require('./resources/customers')(this.api),
        transfers: require('./resources/transfers')(this.api),
        tokens: require('./resources/tokens')(this.api),
        virtualAccounts: require('./resources/virtualAccounts')(this.api),
        invoices: require('./resources/invoices')(this.api),
        iins: require('./resources/iins')(this.api),
        paymentLink: require('./resources/paymentLink')(this.api),
        plans: require('./resources/plans')(this.api),
        products: require('./resources/products')(this.api),
        subscriptions: require('./resources/subscriptions')(this.api),
        addons: require('./resources/addons')(this.api),
        settlements: require('./resources/settlements')(this.api),
        qrCode: require('./resources/qrCode')(this.api),
        fundAccount: require('./resources/fundAccount')(this.api),
        items: require('./resources/items')(this.api),
        cards: require('./resources/cards')(this.api),
        webhooks: require('./resources/webhooks')(this.api),
        documents: require('./resources/documents')(this.api),
        disputes: require('./resources/disputes')(this.api)
      });
    }
  }], [{
    key: "validateWebhookSignature",
    value: function validateWebhookSignature() {
      return _validateWebhookSignature.apply(void 0, arguments);
    }
  }]);
}();
_defineProperty(Razorpay, "VERSION", pkg.version);
module.exports = Razorpay;