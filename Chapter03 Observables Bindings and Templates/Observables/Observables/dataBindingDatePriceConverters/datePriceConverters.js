(function () {
    "use strict";

    // Converts 77.8900 to $77.89
    var price = WinJS.Binding.converter(function (priceToConvert) {
        return "$" + priceToConvert.toFixed(2);
    });

    // Converts full date to 12/25/2013
    var shortDate = WinJS.Binding.converter(function (dateToConvert) {
        return dateToConvert.getMonth() + 1 +
            "/" + dateToConvert.getDate() +
            "/" + dateToConvert.getFullYear();
    });


    WinJS.Namespace.define("MyBindingConverters",
        {
            price: price,
            shortDate: shortDate
        });

})();

