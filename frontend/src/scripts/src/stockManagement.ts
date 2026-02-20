

export function getCurrentStock(product_id: number, warehouse_id: number): number {

  const stocks = JSON.parse(
    localStorage.getItem("stockManagement") || "[]"
  );

  const productStocks = stocks.filter(
    (s: any) =>
      s.product_id === product_id 
    //     &&
    //   s.warehouse_id === warehouse_id
  );

  if(productStocks.length === 0) return 0;

  return productStocks[productStocks.length - 1].stock_after; // it is to get the last latest stock coz the last one is the latest stock movement
}




export function addStockEntry(
  product_id: number,
  warehouse_id: number,
  movement_type_id: number,
  quantity: number
) {

  const stocks = JSON.parse(
    localStorage.getItem("stockManagement") || "[]"
  );

  const currentStock = getCurrentStock(product_id, warehouse_id);

  let newStock = currentStock;

  if(movement_type_id === 1){
    newStock = currentStock + quantity;   // Purchase Order 
  } else {
    newStock = currentStock - quantity;   // Customer Orders means Sale 
  }

  const newEntry = {
    id: Date.now(),
    product_id,
    warehouse_id,
    movement_type_id,
    quantity,
    stock_after: newStock
  };

  stocks.push(newEntry);

  localStorage.setItem("stockManagement", JSON.stringify(stocks));
}

