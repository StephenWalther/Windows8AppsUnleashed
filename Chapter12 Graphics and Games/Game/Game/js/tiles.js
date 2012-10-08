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
    tiles.wall = new Tile("/images/brick.png");
    tiles.player = new Tile("/images/hero.gif");
    tiles.zombie = new Tile("/images/zombie.gif");
    tiles.hamburger = new Tile("/images/hamburger.png");

    WinJS.Namespace.define("Unleashed", {
        Tiles: tiles
    });

})();
