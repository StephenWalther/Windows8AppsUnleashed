(function () {
    "use strict";


    WinJS.Application.addEventListener("loaded", function (evt) {
        console.log("loaded");
    });
    WinJS.Application.addEventListener("activated", function (evt) {
        console.log("activated");
    });
    WinJS.Application.addEventListener("ready", function (evt) {
        console.log("ready");
    });

    WinJS.Application.start();


})();