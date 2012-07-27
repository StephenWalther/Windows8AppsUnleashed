(function () {
"use strict";
    WinJS.Application.onsettings = function (e) {
        e.detail.applicationcommands = {
            "divPersonal": { href: "personalSettings.html", title: "Personal" },
            "divAbout": { href: "aboutSettings.html", title: "About" }
        };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    }
    WinJS.Application.start();
})();
