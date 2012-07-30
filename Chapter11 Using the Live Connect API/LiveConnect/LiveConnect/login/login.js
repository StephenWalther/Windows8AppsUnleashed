(function () {
    "use strict";

    var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
    
    function init() {
        var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
        var spanResults = document.getElementById("spanResults");

        var scopes = ["wl.signin"];
        WL.init({
            scope: scopes,
            redirect_uri: REDIRECT_DOMAIN
        });

        WL.login().then(
            function (loginResults) {
                spanResults.innerText = "Connected";
            },
            function (loginResponse) {
                spanResults.innerText = "Error when calling WL.login";
            }
        );

    }

    document.addEventListener("DOMContentLoaded", init);
})();
