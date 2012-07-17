function wait10Seconds() {
    return new WinJS.Promise(function (complete, error, progress) {
        var seconds = 0;
        var intervalId = window.setInterval(function () {
            seconds++;
            progress(seconds);
            if (seconds > 9) {
                window.clearInterval(intervalId);
                complete();
            }
        }, 1000);
    });
}

wait10Seconds().done(
        function () { console.log("complete") },
        function () { console.log("error") },
        function (seconds) { console.log("progress:" + seconds) }
);
