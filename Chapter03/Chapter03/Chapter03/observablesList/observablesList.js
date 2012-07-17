

var products = [
    {name: "Milk", price: 2.99},
    { name: "Oranges", price: 2.50 },
    { name: "Apples", price: 1.99 }
];

// Create List
var productsList = new WinJS.Binding.List(products);

// Setup event handlers
productsList.oniteminserted = function (evt) {
    var message = "Item Inserted: " + evt.detail.value.name
        + " at index " + evt.detail.index
        + " with key " + evt.detail.key;
    console.log(message);
};

productsList.onitemchanged = function (evt) {
    var message = "Item Changed: " + evt.detail.oldValue.name
        + " to " + evt.detail.newValue.name
        + " at index " + evt.detail.index
        + " with key " + evt.detail.key;
    console.log(message);
};

productsList.onitemmutated = function (evt) {
    var message = "Item Mutated: " + evt.detail.value.name
        + " with key " + evt.detail.key;
    console.log(message);
};

productsList.onitemremoved = function (evt) {
    var message = "Item Removed: " + evt.detail.value.name
        + " at index " + evt.detail.index
        + " with key " + evt.detail.key;
    console.log(message);
};

productsList.onitemmoved = function (evt) {
    var message = "Item Moved: " + evt.detail.value.name
        + " from index " + evt.detail.oldIndex
        + " to index " + evt.detail.newIndex;
    console.log(message);
};

productsList.onreload = function (evt) {
    var message = "List Reloaded";
    console.log(message);
};

// Insert an item
productsList.push({ name: "Carrots", price: 2.33 }); // triggers iteminserted

// Replace an entire item
productsList.setAt(1, { name: "Navel Oranges", price: 2.50 }); // triggers itemchanged

// Update an item property
productsList.getAt(1).price = 500.00;
productsList.notifyMutated(1); // triggers itemmutated

// Delete an item
productsList.splice(0, 1); // triggers itemremoved

// Move second item to top
productsList.move(1, 0); // triggers itemmoved

// Sort the list
productsList.sort(); // triggers reload
