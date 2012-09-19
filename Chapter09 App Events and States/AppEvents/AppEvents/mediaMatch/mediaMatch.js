(function () {
    "use strict";

    window.matchMedia("(orientation:portrait)").addListener(function (mql) {
        if (mql.matches) {
            console.log("Switched to portrait");
        }
    });


})();