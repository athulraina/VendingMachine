const Money = require('./Money');
const { VendingMachine, Inventory,} = require('./VendingMachine');

// Money
describe('Money', () => {
    test('addAmount() should return a new Money object with the added amount', () => {
      const money = new Money(5);
      const bal = new Money(15);
      expect(money.addAmount(10)).toEqual(new Money(15));
    });
    test('should subract money 6 from money 20 and return  ', () => {
        const money = new Money(20);
      expect(money.subtract(6)).toEqual(new Money(14))
    });
});

describe('Insert Money to Vendging Machine ', () => {
    const machine =  new VendingMachine();
    test('add money 10 to current  balnce', () => {
      expect(machine.insertMoney(15)).toEqual(new Money(15));
    });
    test('add money 20 to current balance', () => {
        expect(machine.insertMoney(20)).toEqual(new Money(35));
    });
});

// Buy products
describe('purchase single products via Vending Machine ', () => {
    const machine = new VendingMachine();
    test('purchase product Coke and return change ', () => {
        machine.insertMoney(35);
        expect(machine.dispense(['Coke'])).toEqual({
            "balanceAmount": new Money(13),                      // here disc- 20 and tax -2  total 22
            "selectedProducts": ['Coke'],

        });
    });

    test('purchase product Pepsi with insufficent balance return error message ', () => {
        machine.insertMoney(15);
        expect(machine.dispense(['Pepsi'])).toEqual({
            "error": "Insufficient balance",
        });
    });
});


describe('purchase multiple products via Vending Machine  ', () => {
    const machine = new VendingMachine();
    test('purchase product Candy,Snack and return change ', () => {
        machine.insertMoney(100);
        const result = machine.dispense(['Candy', 'Snack']);
        console.log('result in test: ', result);

        expect(result).toEqual({
            "balanceAmount": new Money(34.55),              // here candy final after tax and discount- 10.45 and snack -55  total 65.45
            "selectedProducts": ['Candy', 'Snack']

        });
    });

    test('purchase product Pepsi with insufficent balance return error message ', () => {
        machine.insertMoney(30);
        expect(machine.dispense(['Pepsi','Soda'])).toEqual({
            "error": "Insufficient balance",
        });
    });
});


// Reset
describe('rest', () => {
    const machine =  new VendingMachine();
    test('should reset the balance and selectedProduct to initial values', () => {
        machine.insertMoney(100);
        machine.dispense('Coke');
        expect(machine.reset()).toEqual({"balance": {"amount": 0}});
    });
}); 

// Cancel purchase
// describe('cancel', () => {
//     const machine =  new VendingMachine();
//     test('should cancel the purchase and retun the balance', () => {
//         machine.insertMoney(100);
//         machine.processPurchase(['Coke']);
//         expect(machine.cancelRequest()).toEqual(new Money(75));
//     });
// }); 
