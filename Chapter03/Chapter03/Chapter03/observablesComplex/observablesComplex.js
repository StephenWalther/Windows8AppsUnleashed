// Create object with complex property
var customer = {
    shippingAddress: {
        street: "312 Main Street"
    }
};

// Create observable
var observableCustomer = WinJS.Binding.as(customer);

// Bind to complex property
WinJS.Binding.bind(observableCustomer, {
    shippingAddress: {
        street: function (newValue) {
            console.log("Modified shipping address to "
                + newValue);
        }
    }
});



// Change value of complex property
observableCustomer.shippingAddress.street = "100 Grant Street";

