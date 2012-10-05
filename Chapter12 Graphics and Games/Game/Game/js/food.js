/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    function Food(tile, x, y) {
        this.tile = tile;
        this.x = x;
        this.y = y;
    }


    WinJS.Namespace.define("Unleashed", {
        Food: Food
    });

})();
