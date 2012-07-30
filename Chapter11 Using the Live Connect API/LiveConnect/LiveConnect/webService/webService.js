(function () {
    "use strict";

    var serviceURL = "http://localhost:51308/api/tasks";
    var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";

    function init() {
        WinJS.UI.processAll().done(function () {
            var lvTasks = document.getElementById("lvTasks").winControl;

            // Init Live Connect
            var scopes = ["wl.signin"];
            WL.init({
                scope: scopes,
                redirect_uri: REDIRECT_DOMAIN
            });

            // Login to Live Connect
            WL.login().then(
                function (loginResults) {
                    // Bind ListView to web data source
                    var tasksDataSource = new DataSources.WebServiceDataSource(
                        serviceURL,
                        "id",
                        loginResults.session.authentication_token
                    );
                    lvTasks.itemDataSource = tasksDataSource;
                },
                function (loginResponse) {
                    spanResults.innerText = "Error when calling WL.login";
                }
            );
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();