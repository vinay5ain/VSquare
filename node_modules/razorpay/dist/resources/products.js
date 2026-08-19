'use strict';

module.exports = function (api) {
  var BASE_URL = "/accounts";
  return {
    requestProductConfiguration: function requestProductConfiguration(accountId, params, callback) {
      return api.post({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/products"),
        data: params
      }, callback);
    },
    edit: function edit(accountId, productId, params, callback) {
      return api.patch({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/products/").concat(productId),
        data: params
      }, callback);
    },
    fetch: function fetch(accountId, productId, callback) {
      return api.get({
        version: 'v2',
        url: "".concat(BASE_URL, "/").concat(accountId, "/products/").concat(productId)
      }, callback);
    },
    fetchTnc: function fetchTnc(productName, callback) {
      return api.get({
        version: 'v2',
        url: "/products/".concat(productName, "/tnc")
      }, callback);
    }
  };
};