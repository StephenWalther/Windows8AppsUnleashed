var Robot = {
    makeNoise: function () {
        return "beep";
    }
};

var Roomba = WinJS.Class.mix(
    function (name) {
        this.name = name;
    },
    Robot
);

var myRoomba = new Roomba("rover");
console.log(myRoomba.makeNoise()); // Writes "beep"
