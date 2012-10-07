/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    WinJS.Namespace.define("Unleashed", {
        Sounds: {
            yum: new Audio("/sounds/yum.wav"),
            eaten: new Audio("/sounds/eaten.wav"),
            cheer: new Audio("/sounds/cheer.wav")
        }
    });

})();
