// Simple product object
var product = {
    name: "Milk",
    description: "Something to drink",
    price: 12.33
};

// Create observable product
var observableProduct = WinJS.Binding.as(product);

// Execute a function when price is changed
observableProduct.bind("price", function (newValue) {
    console.log(newValue);
});

// Change the price silently
observableProduct.backingData.price = 5.99;
console.log(observableProduct.price); // Writes 5.99
