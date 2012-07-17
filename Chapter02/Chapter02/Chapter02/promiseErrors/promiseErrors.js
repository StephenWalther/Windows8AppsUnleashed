var options = {
    url: "http://BadURL"
};

WinJS.xhr(options).then();  // DOES NOT throw an exception

WinJS.xhr(options).done();  // DOES throw an exception
