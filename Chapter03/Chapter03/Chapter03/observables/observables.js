// Simple product object
var product = {
    name: "Milk",
    description: "Something to drink",
    price: 12.33
};

// Create observable product
var observableProduct = WinJS.Binding.as(product);

// Execute a function when price is changed
observableProduct.bind("price", function (newValue, oldValue) {
    console.log(newValue + " was " + oldValue);
});

// Change the price
observableProduct.price = 2.99;

