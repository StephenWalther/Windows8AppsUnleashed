(function () {
    "use strict";

    var _gameScore;

    WinJS.Application.addEventListener("activated", function (evt) {
        var appState = Windows.ApplicationModel.Activation.ApplicationExecutionState;
        if (evt.detail.previousExecutionState == appState.notRunning ||
            evt.detail.previousExecutionState == appState.closedByUser) {
            // Set default game score
            _gameScore = 0;
            console.log("setting default gamescore");
        }
        if (evt.detail.previousExecutionState == appState.terminated) {
            // Load game score from session state
            _gameScore = WinJS.Application.sessionState.gameScore;
            console.log("setting gamescore from session state");
        }
    });

    WinJS.Application.addEventListener("checkpoint", function () {
        // Save game score to session state
        WinJS.Application.sessionState.gameScore = _gameScore;
    });

    WinJS.Application.addEventListener("ready", function (evt) {
        // Killed alien, +1 to game score
        document.getElementById("btnKillAlien").addEventListener("click", function () {
            _gameScore++;
        });
    });

    WinJS.Application.start();
})();
