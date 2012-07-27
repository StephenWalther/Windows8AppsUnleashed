(function () {
    "use strict";


    var onSaleToDisplay = WinJS.Binding.converter(function (onSale) {
        return onSale ? "block" : "none";
    });
       

    WinJS.Namespace.define("MyBindingConverters",
        {
            onSaleToDisplay: onSaleToDisplay
        });

})();

