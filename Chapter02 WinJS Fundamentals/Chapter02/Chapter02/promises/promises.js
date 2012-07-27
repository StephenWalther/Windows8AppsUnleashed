var options = {
    url: "http://stephenwalther.com/blog/feed",
    responseType: "document"
};

WinJS.xhr(options).done(
    function (xmlHttpRequest) {
        console.log("success");

        // Display title of first blog entry
        var firstTitle = xmlHttpRequest.response.querySelector("item>title");
        console.log(firstTitle.textContent);
    },
    function (xmlHttpRequest) {
        console.log("fail");
    },
    function (xmlHttpRequest) {
        console.log("progress");
    }
)
