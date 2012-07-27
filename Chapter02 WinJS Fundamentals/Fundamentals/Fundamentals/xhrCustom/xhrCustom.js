(function () {
    "use strict";

    function initialize() {
        // Cache references to DOM elements
        var prgResults = document.getElementById("prgResults");
        var divResults = document.getElementById("divResults");

        // Create xhr options
        var options = {
            url: "products.txt",
            customRequestInitializer: function (xhr) {
                xhr.onprogress = function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        prgResults.value = percentComplete;
                    }
                };
            }
        };

        // Perform Ajax request
        WinJS.xhr(options).done(
            function (xhr) {
                divResults.innerHTML = xhr.response;
            }
        );
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();

