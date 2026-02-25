"use strict";
exports.__esModule = true;
exports.addStockEntry = exports.getCurrentStock = void 0;
function getCurrentStock(product_id, warehouse_id) {
    var stocks = JSON.parse(localStorage.getItem("stockManagement") || "[]");
    var productStocks = stocks.filter(function (s) {
        return s.product_id === product_id &&
            s.warehouse_id === warehouse_id;
    });
    if (productStocks.length === 0)
        return 0;
    return productStocks[productStocks.length - 1].stock_after;
}
exports.getCurrentStock = getCurrentStock;
function addStockEntry(product_id, warehouse_id, movement_type_id, quantity) {
    var stocks = JSON.parse(localStorage.getItem("stockManagement") || "[]");
    var currentStock = getCurrentStock(product_id, warehouse_id);
    var newStock = currentStock;
    if (movement_type_id === 1) {
        newStock = currentStock + quantity; // Purchase Order 
    }
    else {
        if (currentStock < quantity) {
            console.log("Stock can't be negative");
            return false;
        }
        newStock = currentStock - quantity; // Customer Orders means Sale 
    }
    var newEntry = {
        id: Date.now(),
        product_id: product_id,
        warehouse_id: warehouse_id,
        movement_type_id: movement_type_id,
        quantity: quantity,
        stock_after: newStock
    };
    stocks.push(newEntry);
    localStorage.setItem("stockManagement", JSON.stringify(stocks));
}
exports.addStockEntry = addStockEntry;
