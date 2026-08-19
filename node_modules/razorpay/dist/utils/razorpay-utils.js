"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var crypto = require("crypto");
function getDateInSecs(date) {
  return +new Date(date) / 1000;
}
function normalizeDate(date) {
  return isNumber(date) ? date : getDateInSecs(date);
}
function isNumber(num) {
  return !isNaN(Number(num));
}
function isNonNullObject(input) {
  return !!input && _typeof(input) === "object" && !Array.isArray(input);
}
function normalizeBoolean(bool) {
  if (bool === undefined) {
    return bool;
  }
  return bool ? 1 : 0;
}
function isDefined(value) {
  return typeof value !== "undefined";
}
function normalizeNotes() {
  var notes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var normalizedNotes = {};
  for (var key in notes) {
    normalizedNotes["notes[".concat(key, "]")] = notes[key];
  }
  return normalizedNotes;
}
function prettify(val) {
  /*
   * given an object , returns prettified string
   *
   * @param {Object} val
   * @return {String}
   */

  return JSON.stringify(val, null, 2);
}
function getTestError(summary, expectedVal, gotVal) {
  /*
   * @param {String} summary
   * @param {*} expectedVal
   * @param {*} gotVal
   *
   * @return {Error}
   */

  return new Error("\n".concat(summary, "\n") + "Expected(".concat(_typeof(expectedVal), ")\n").concat(prettify(expectedVal), "\n\n") + "Got(".concat(_typeof(gotVal), ")\n").concat(prettify(gotVal)));
}
function validateWebhookSignature(body, signature, secret) {
  /*
   * Verifies webhook signature
   *
   * @param {String} summary
   * @param {String} signature
   * @param {String} secret
   *
   * @return {Boolean}
   */

  var crypto = require("crypto");
  if (!isDefined(body) || !isDefined(signature) || !isDefined(secret)) {
    throw Error("Invalid Parameters: Please give request body," + "signature sent in X-Razorpay-Signature header and " + "webhook secret from dashboard as parameters");
  }
  body = body.toString();
  var expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expectedSignature === signature;
}
function validatePaymentVerification() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var signature = arguments.length > 1 ? arguments[1] : undefined;
  var secret = arguments.length > 2 ? arguments[2] : undefined;
  /*
   * Payment verfication
   *
   * @param {Object} params
   * @param {String} signature
   * @param {String} secret
   * @return {Boolean}
   */

  var paymentId = params.payment_id;
  if (!secret) {
    throw new Error("secret is mandatory");
  }
  if (isDefined(params.order_id) === true) {
    var orderId = params.order_id;
    var payload = orderId + '|' + paymentId;
  } else if (isDefined(params.subscription_id) === true) {
    var subscriptionId = params.subscription_id;
    var payload = paymentId + '|' + subscriptionId;
  } else if (isDefined(params.payment_link_id) === true) {
    var paymentLinkId = params.payment_link_id;
    var paymentLinkRefId = params.payment_link_reference_id;
    var paymentLinkStatus = params.payment_link_status;
    var payload = paymentLinkId + '|' + paymentLinkRefId + '|' + paymentLinkStatus + '|' + paymentId;
  } else {
    throw new Error('Either order_id or subscription_id is mandatory');
  }
  return validateWebhookSignature(payload, signature, secret);
}
;
function generateOnboardingSignature() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var secret = arguments.length > 1 ? arguments[1] : undefined;
  var jsonStr = JSON.stringify(params);
  return encrypt(jsonStr, secret);
}
function encrypt(dataToEncrypt, secret) {
  try {
    var keyBytes = Buffer.from(secret.slice(0, 16), 'utf8');

    // Generate a fresh random 12-byte nonce per call (fixes AES-GCM nonce reuse).
    // A static IV derived from the key allows keystream recovery and tag forgery
    // (NIST SP 800-38D §8.3 Forbidden Attack) using only two captured ciphertexts.
    var iv = crypto.randomBytes(12);
    var cipher = crypto.createCipheriv('aes-128-gcm', keyBytes, iv);
    var encryptedData = cipher.update(dataToEncrypt, 'utf8');
    encryptedData = Buffer.concat([encryptedData, cipher["final"]()]);
    var authTag = cipher.getAuthTag();

    // Output format: iv (12 bytes) || ciphertext || tag (16 bytes), hex-encoded.
    // Receiver must read the first 24 hex chars as the IV before decrypting.
    return Buffer.concat([iv, encryptedData, authTag]).toString('hex');
  } catch (err) {
    throw new Error("Encryption failed: ".concat(err.message));
  }
}
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = {
  normalizeNotes: normalizeNotes,
  normalizeDate: normalizeDate,
  normalizeBoolean: normalizeBoolean,
  isNumber: isNumber,
  getDateInSecs: getDateInSecs,
  prettify: prettify,
  isDefined: isDefined,
  isNonNullObject: isNonNullObject,
  getTestError: getTestError,
  validateWebhookSignature: validateWebhookSignature,
  validatePaymentVerification: validatePaymentVerification,
  isValidUrl: isValidUrl,
  generateOnboardingSignature: generateOnboardingSignature
};