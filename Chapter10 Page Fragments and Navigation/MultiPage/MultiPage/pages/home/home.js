(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            var lnkAnotherPage = document.getElementById("lnkAnotherPage");
            lnkAnotherPage.addEventListener("click", function(evt) {
                evt.preventDefault();
                WinJS.Navigation.navigate("/pages/anotherPage/anotherPage.html");
            });
        }
    });
})();
