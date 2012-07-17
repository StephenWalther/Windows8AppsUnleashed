WinJS.Promise.join([WinJS.Promise.timeout(1000), WinJS.Promise.timeout(5000)])
    .done(function () { console.log("join complete"); });

WinJS.Promise.any([WinJS.Promise.timeout(1000), WinJS.Promise.timeout(5000)])
    .done(function () { console.log("any complete"); });
