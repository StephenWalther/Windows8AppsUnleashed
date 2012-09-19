(function () {
    "use strict";


    WinJS.Application.addEventListener("activated", function (evt) {
        var activationKind = Windows.ApplicationModel.Activation.ActivationKind;
        switch (evt.detail.kind) {
            case activationKind.launch:
                console.log("Launched from a tile");
                break;
            case activationKind.search:
                console.log("Activated from a search");
                break;
            default:
                console.log("Activated for some other reason");
        }
    });

    WinJS.Application.start();

})();