(function () {
    "use strict";

    var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
    
    function init() {
        var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";

        var spanError = document.getElementById("error");
        var spanFirstName = document.getElementById("spanFirstName");
        var spanLastName = document.getElementById("spanLastName");
        var spanBirthday = document.getElementById("spanBirthday");

        var scopes = ["wl.signin", "wl.basic"];
        WL.init({
            scope: scopes,
            redirect_uri: REDIRECT_DOMAIN
        });

        WL.login().then(
            function (loginResults) {
                callLiveConnect("me/picture", "GET").then(function (basicResults) {
                    spanFirstName.innerText = basicResults.first_name;
                    spanLastName.innerText = basicResults.last_name;
                    spanBirthday.innerText = basicResults.birthday;
                },
                function () {
                    spanError.innerText = "Error when calling WL.api";
                });
            },
            function (loginResponse) {
                spanError.innerText = "Error when calling WL.login";
            }
        );

        function callLiveConnect(path, method) {
            return WL.api({
                path: path,
                method: method
            });
        }

    }

    document.addEventListener("DOMContentLoaded", init);
})();
