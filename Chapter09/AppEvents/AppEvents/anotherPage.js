/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />

(function () {
    "use strict";

    WinJS.Application.addEventListener("activated", function () {

        console.log("activated another");
    });


    WinJS.Application.start();
})();