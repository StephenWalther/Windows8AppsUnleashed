// Specify Ajax request options
var options = {
    url: "http://StephenWalther.com"
};

// Make the Ajax request
var request = WinJS.xhr(options).then(
    function (xmlHttpRequest) {
        console.log("success");
    },
    function (xmlHttpRequest) {
        console.log("fail: " + xmlHttpRequest.message);
    },
    function (xmlHttpRequest) {
        console.log("progress");
    }
);

// Cancel the Ajax request
request.cancel();
