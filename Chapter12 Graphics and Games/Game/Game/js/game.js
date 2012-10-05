/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="tiles.js" />
/// <reference path="direction.js" />

(function () {
    "use strict";

    var HORIZONTAL_TILES = 20;
    var VERTICAL_TILES = 15;
    var TILE_HEIGHT = 50;
    var TILE_WIDTH = 50;
    var MAX_HOLES_PER_ROW = 3;
    var FOOD_COUNT = 5;


    var Game = WinJS.Class.define(
        // Constructor
        function () {
            // Setup Canvas
            var canvas = document.getElementById("canvas");
            this._ctx = canvas.getContext("2d");
        },
        // Instance Members
        {
            _board: [],
            _player: {},
            _food: [],
            _monsters: [],


            start: function() {
                this._updateLoopId = window.setInterval(this.executeUpdateLoop.bind(this), 250);
                this._animationLoopId = window.requestAnimationFrame(this.executeRenderLoop.bind(this));
                
                // Add move player listener
                document.addEventListener("keydown", this.movePlayer.bind(this));
            },





            stop: function () {
                window.clearInterval(this._updateLoopId);
                window.cancelAnimationFrame(this.animationLoopId);
            },



            movePlayer: function(e) {
                switch (e.keyCode) {
                    case WinJS.Utilities.Key.upArrow:
                        this._player.direction = Unleashed.Direction.up;
                        return;
                    case WinJS.Utilities.Key.downArrow:
                        this._player.direction = Unleashed.Direction.down;
                        return;
                    case WinJS.Utilities.Key.leftArrow:
                        this._player.direction = Unleashed.Direction.left;
                        return;
                    case WinJS.Utilities.Key.rightArrow:
                        this._player.direction = Unleashed.Direction.right;
                        return;
                }

            },



            executeUpdateLoop: function () {
                this.updateMonsterPositions();
                this.updatePlayerPosition();
            },


            updateMonsterPositions: function() {
                for (var i = 0; i < this._monsters.length; i++) {
                    var monster = this._monsters[i];
                    var result = this.moveCharacter(monster);
                    if (result === false || this.getRandomNumber(0, 2) === 0) {
                        monster.direction = this.getRandomDirection();
                        this.moveCharacter(monster);
                    }
                }
            },


            moveCharacter: function(character) {
                switch (character.direction) {
                    case Unleashed.Direction.none:
                        return true;
                    case Unleashed.Direction.up:
                        if (this.collideWithWall(character.x, character.y-1)) {
                            return false;
                        }
                        character.y --;
                        return true;
                    case Unleashed.Direction.down:
                        if (this.collideWithWall(character.x, character.y + 1)) {
                            return false;
                        }
                        character.y++;
                        return true;
                    case Unleashed.Direction.right:
                        if (this.collideWithWall(character.x+1, character.y)) {
                            return false;
                        }
                        character.x++;
                        return true;
                    case Unleashed.Direction.left:
                        if (this.collideWithWall(character.x-1, character.y)) {
                            return false;
                        }
                        character.x--;
                        return true;
                }

            },


            collideWithWall: function(x,y) {
                return (this.getTile(x, y) === Unleashed.Tiles.wall);
            },


            updatePlayerPosition: function() {
                this.moveCharacter(this._player);
            },


            generateBoard: function () {
                this.generateWalls();
                this.generateHoles();
                this.generatePlayer();
                this.generateMonsters();
                this.generateFood();
            },




            generatePlayer: function () {
                // Player starts at 1,1 tile
                this._player = new Unleashed.Character(Unleashed.Tiles.player, Unleashed.Direction.none, 1, 1);
            },

            generateMonsters: function() {
                // Add monsters to three corners
                this._monsters.push(new Unleashed.Character(Unleashed.Tiles.zombie, this.getRandomDirection(), HORIZONTAL_TILES - 2, 1));
                this._monsters.push(new Unleashed.Character(Unleashed.Tiles.zombie, this.getRandomDirection(), HORIZONTAL_TILES - 2, VERTICAL_TILES - 2));
                this._monsters.push(new Unleashed.Character(Unleashed.Tiles.zombie, this.getRandomDirection(), 1, VERTICAL_TILES - 2));
            },


            getRandomDirection: function() {
                switch (this.getRandomNumber(0,5)) {
                    case 0: return Unleashed.Direction.none;
                    case 1: return Unleashed.Direction.up;
                    case 2: return Unleashed.Direction.down;
                    case 3: return Unleashed.Direction.left;
                    case 4: return Unleashed.Direction.right;
                }
            },


            generateFood: function() {
                for (var i = 0; i < FOOD_COUNT; i++) {
                    do {
                        var x = this.getRandomNumber(3,HORIZONTAL_TILES-3);
                        var y = this.getRandomNumber(3,VERTICAL_TILES-3);
                    } while (this.getTile(x,y) === Unleashed.Tiles.wall);
                    this._food.push(new Unleashed.Food(Unleashed.Tiles.hamburger, x, y));
                }
            },


            generateWalls: function() {
                // Generate walls everywhere
                for (var y = 0; y < VERTICAL_TILES; y ++) {
                    for (var x = 0; x < HORIZONTAL_TILES; x++) {
                        this.updateTile(x, y, Unleashed.Tiles.wall);
                    }
                }
            },

            generateHoles: function () {
                // Clear out every two rows
                for (var y = 1; y < VERTICAL_TILES -1; y+=2) {
                    for (var x = 1; x < HORIZONTAL_TILES-1; x++) {
                        this.updateTile(x, y, Unleashed.Tiles.background);
                    }
                }


                // Generate random holes every other row
                for (var y = 2; y < VERTICAL_TILES-1; y += 2) {
                    for (var i = 0; i < MAX_HOLES_PER_ROW; i++) {
                        var x = this.getRandomNumber(1, HORIZONTAL_TILES-2);
                        this.updateTile(x, y, Unleashed.Tiles.background);
                    }
                }
            },
    

            getRandomNumber:function(lowerBound, upperBound) {
                return Math.floor(Math.random() * upperBound) + lowerBound;
            },

            updateTile:function(x, y, tile) {
                this._board[(y * HORIZONTAL_TILES) + x] = tile;
            },


            getTile:function(x, y) {
                return this._board[(y * HORIZONTAL_TILES) + x];
            },


            executeRenderLoop: function () {
                this.render();
                this._animationLoopId = window.requestAnimationFrame(this.executeRenderLoop.bind(this));
            },


            render: function () {
                this.renderBoard();
                this.renderFood();
                this.renderMonsters();
                this.renderPlayer();
            },


            renderBoard: function () {
                // Render background tiles
                for (var y = 0; y < VERTICAL_TILES; y++) {
                    for (var x = 0; x < HORIZONTAL_TILES; x++) {
                        var tile = this.getTile(x, y);
                        if (tile) {
                            this.drawImage(tile.image, x, y);
                        } else {
                            this.drawImage(Unleashed.Tiles.background.image, x, y);
                        }
                    }
                }
            },

            renderFood: function () {
                for (var i = 0; i < this._food.length; i++) {
                    var food = this._food[i];
                    this.drawImage(food.tile.image, food.x, food.y);
                }
            },


            renderMonsters: function () {
                for (var i = 0; i < this._monsters.length; i++) {
                    var monster = this._monsters[i];
                    this.drawImage(monster.tile.image, monster.x, monster.y);
                }
            },

            renderPlayer: function () {
               this.drawImage(this._player.tile.image, this._player.x, this._player.y);
            },

            drawImage: function (image, x, y) {
                this._ctx.drawImage(image, x * TILE_WIDTH, y * TILE_HEIGHT);
            }


        }
    );




    WinJS.Namespace.define("Unleashed", {
        Game: Game
    });

})();
