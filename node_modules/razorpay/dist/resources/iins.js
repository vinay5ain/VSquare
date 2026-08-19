'use strict';

module.exports = function (api) {
  var BASE_URL = "/iins";
  return {
    fetch: function fetch(tokenIin, callback) {
      return api.get({
        url: "".concat(BASE_URL, "/").concat(tokenIin)
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return api.get({
        url: "".concat(BASE_URL, "/list"),
        data: params
      }, callback);
    }
  };
};