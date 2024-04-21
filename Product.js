const Money = require('./Money');

class Product {
  constructor(name, price, quantity, tax, discount) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.tax = tax;
    this.discount = discount;
  }


  buyProduct(amount) {
    const totalPrice = getPrice(this.price, this.discount, this.tax);
    if (amount.amount >= totalPrice) {
      if (this.quantity > 0) {
        const newPrice = amount.subtract(totalPrice);
        this.quantity--;
        return { balanceAmount: newPrice, selectedProduct: this.name };
      } else {
        return { error: 'Product out of stock' };
      }
    } else {
      return { error: 'Insufficient balance' };
    }
  }
  
}

// implement tax and discount
function getPrice(price, discount, tax) {
  let discountedPrice = price - (price * discount);
  let taxAmount = discountedPrice * tax;
  let totalPrice = discountedPrice + taxAmount;
  console.log('finalPrice ===================>: ', totalPrice);
  return totalPrice;
}

module.exports = Product;
