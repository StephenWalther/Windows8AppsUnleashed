

var products = [
    { name: "Milk", price: 2.99 },
    { name: "Oranges", price: 2.50 },
    { name: "Apples", price: 1.99 }
];

// Create List
var productsList = new WinJS.Binding.List(products, {binding:true});


// Listen for changes in price
productsList.getAt(1).bind("price", function () {
    console.log("price changed");
});
