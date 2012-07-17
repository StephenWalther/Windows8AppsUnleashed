var Robot = WinJS.Class.define(
    function () {
        this.type = "Robot"
    },
    {
        sayHello: function () {
            return "My name is " + this.name
                + " and I am a " + this.type;
        }
    }
);

var Roomba = WinJS.Class.derive(
    Robot,
    function (name) {
        this.name = name;
        this.type = "Roomba";
    }
);

var AIBO = WinJS.Class.derive(
    Robot,
    function (name) {
        this.name = name;
        this.type = "AIBO";
    }
);

// Create a Roomba
var myRoomba = new Roomba("rover");
console.log(myRoomba.sayHello());

// Create an AIBO
var myAIBO = new AIBO("spot");
console.log(myAIBO.sayHello());
