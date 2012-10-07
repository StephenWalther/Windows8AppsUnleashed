/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    function Tile(url) {
        this.image = new Image();
        this.image.src = url;
    }


    var tiles = {};
    tiles.background = new Tile("/images/background.jpg");
    tiles.wall = new Tile("/images/brick.jpg");
    tiles.player = new Tile("/images/hero.png");
    tiles.zombie = new Tile("/images/zombie.jpg");
    tiles.hamburger = new Tile("/images/hamburger.gif");

    WinJS.Namespace.define("Unleashed", {
        Tiles: tiles
    });

})();
