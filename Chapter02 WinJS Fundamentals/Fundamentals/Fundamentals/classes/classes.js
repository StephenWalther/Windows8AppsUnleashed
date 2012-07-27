var Robot = WinJS.Class.define(
    function (name, price) {
        this.name = name;
        this.price = price;
    },
    {
        _name: undefined,
        _price: 0,

        price: {
            set: function (value) {
                if (value < 0) {
                    throw new Error("Invalid price!");
                }
                this._price = value;
            },
            get: function () { return this._price; }
        },
        makeNoise: function () {
            return "Burp, Wow!, oops!";
        }
    }
);



// Create a robot
var roomba = new Robot("Roomba", 200.33);

console.log(roomba.price); // Writes "200.33"
console.log(roomba.makeNoise()); // Writes "Burp, Wow!, oops!" 

// Set invalid price
roomba.price = -88; // Throws "Invalid price!"
