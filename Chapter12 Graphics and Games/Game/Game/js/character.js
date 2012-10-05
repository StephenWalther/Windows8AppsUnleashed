/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    function Character(tile, direction, x, y) {
        this.tile = tile;
        this.direction = direction;
        this.x = x;
        this.y = y;
    }


    WinJS.Namespace.define("Unleashed", {
        Character: Character
    });

})();
