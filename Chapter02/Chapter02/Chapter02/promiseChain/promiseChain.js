var options = {
    url: "http://stephenwalther.com/blog/feed",
    responseType: "document"
};


WinJS.xhr(options).then(
    function (xmlHttpRequest) {
        // Get link for first blog entry
        var firstLink = xmlHttpRequest.response.querySelector("item>link");

        // Make second Ajax request (returns a promise)
        return WinJS.xhr({
            url: firstLink.textContent,
            responseType: "document"
        });
    }
).done(
    function (xmlHttpRequest) {
        // Get body of blog post 
        var postBody = xmlHttpRequest.response.querySelector("div.entry");
       
        // Write first 200 characters of blog post
        console.log(postBody.textContent.trim().substr(0, 200));
    }
);