(function () {
    "use strict";

    function initialize() {

var options = {
    url: "http://stephenwalther.com/blog/feed",
    responseType: "document"
};

WinJS.xhr(options).done(
    function (xhr) {
        var result = xhr.response;  // xhr.response is a document
    }
);
};

    document.addEventListener("DOMContentLoaded", initialize);
})();
