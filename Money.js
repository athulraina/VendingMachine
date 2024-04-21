class Money {
    constructor(amount, currency) {
      this.amount = amount;
      // this.currency = currency;
    }
    // return new Money(this.amount + amount, this.currency);
    addAmount(amount) {
      return new Money(this.amount + amount);
    }

    subtract(amount) {
      return new Money(this.amount - amount)
    }

    available() {
      if (this.amount >= 0) {
        return true
      }
      return false
    }
    
  }
  
  module.exports = Money;