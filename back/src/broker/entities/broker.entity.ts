export class Broker {
    constructor(
        public id: number,
        public firstName: string, 
        public lastName: string,
        public login: string,
        public balance: number, 
        public stocks: Array<{ id: number, name: string, quantity: number, price: number }>) {
    }

    /*
    stock = {
        id: 1,
        name: 'Apple',
        quantity: 10,
        price: 100
    }
    */
    // buyStock(stock: { id: number, name: string, quantity: number, price: number }) {
    //     const existingStock = this.stocks.find(s => s.id === stock.id);
    //     if (existingStock) {
    //         existingStock.quantity += stock.quantity;
    //         this.money -= stock.price * stock.quantity;
    //     } else {
    //         this.stocks.push(stock);
    //         this.money -= stock.price * stock.quantity;
    //     }
    // }
}