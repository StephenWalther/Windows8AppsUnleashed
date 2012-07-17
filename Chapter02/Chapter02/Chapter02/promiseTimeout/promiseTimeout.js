WinJS.Promise.timeout(3000).then(
    function () { console.log("complete") },
    function () { console.log("error") },
    function () { console.log("progress") }
);
