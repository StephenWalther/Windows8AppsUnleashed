"use strict";

var Robot = {
    makeNoise: function () {
        return "beep";
    }
};

var Product = {
    price: {
        set: function (value) {
            if (value < 0) {
                throw new Error("Invalid price!");
            }
            this._price = value;
        },
        get: function () { return this._price; }
    },
    sayName: function () {
        return this.name;
    }
}

var Vacuum = {
    vacuum: function () { return "bzzzzzz"; }
}

var Roomba = WinJS.Class.mix(
    function (name) {
        this.name = name;
    },
    Robot, Product, Vacuum
);

var myRoomba = new Roomba("rover");
console.log(myRoomba.makeNoise()); // Writes "beep"
console.log(myRoomba.sayName()); // Writes "rover"
console.log(myRoomba.vacuum()); // Writes "bzzzzz"
myRoomba.price = -88 // Throws Error
