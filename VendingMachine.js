const Money = require('./Money');
const Product = require('./Product');

class Inventory {
  constructor() {
    this.products = [
      new Product('Candy', 10, 10, 0.1, 0.05),
      new Product('Snack', 50, 10, 0.1, 0),
      new Product('Nuts', 90, 10, 0.1, 0.1),
      new Product('Coke', 25, 10, 0.1, 0.2),
      new Product('Pepsi', 35, 10, 0.1, 0),
      new Product('Soda', 45, 10, 0.1, 0.05)
    ];
  }
  
  
  pick(productName, balance) {
    const selectedProduct = this.products.find(p => p.name === productName);
      if (selectedProduct && selectedProduct.quantity > 0) {
        const result = selectedProduct.buyProduct(balance);
        return result;
      }
      else{
        return{ error: "Product not found"}
      }
      
  }
}


class VendingMachine {
  constructor() {
    this.balance = new Money(0);
    this.selectedProduct = [];

  }


  insertMoney(amount) {
    return this.balance = this.balance.addAmount(amount);
  }


  reset() {
    this.balance = new Money(0, 'USD');
    return { balance: this.balance }
  }

  // cancelRequest() {
  //   const refund = this.balance;
  //   this.balance = new Money(0);
  //   // this.selectedProduct = null;

  //   return refund;
  // }


  dispense(products) {
    const results = [];
    for (const productName of products) {
      const purchase = new Inventory().pick(productName, this.balance);
      console.log('result:=================== ', purchase);
      if ('error' in purchase) {
        return purchase; 
      }
      this.balance = purchase.balanceAmount;
      this.selectedProduct.push(purchase.selectedProduct);
      results.push(purchase);
    }
    return { balanceAmount: this.balance, selectedProducts: this.selectedProduct };
  }

}

module.exports = {
  VendingMachine,
  Inventory
};
