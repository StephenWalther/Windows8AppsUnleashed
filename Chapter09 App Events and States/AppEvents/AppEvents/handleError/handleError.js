(function () {
    "use strict";

    WinJS.Application.addEventListener("error", function (evt) {
        var message = new Windows.UI.Popups.MessageDialog(
            "There was an error."
        );
        message.showAsync();
        return true;
    });

    WinJS.Application.addEventListener("ready", function () {
        throw new WinJS.ErrorFromName("MyError", "Yikes! An Error!");
    });

    WinJS.Application.start();
})();