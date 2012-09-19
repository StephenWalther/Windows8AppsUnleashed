(function () {
    "use strict";

    window.setInterval(function () {
        WinJS.Application.queueEvent({ type: "heartbeat" });
    }, 1000);

    WinJS.Application.addEventListener("heartbeat", function (evt) {
        console.log("heartbeat");
    });

    WinJS.Application.start();

})();