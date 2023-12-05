export class Stocks {
    constructor(
        public id: number,
        public companyName: string,
        public companySymbol: string,
        public stock: Array<
            { 
                Date: string,
                Last: string,
                Volume: number,
                Open: string,
                High: string,
                Low: string
            }
        >,
        public selected: boolean
    ) {}

    // getPrice(date: string) {
    //     const stock = this.stock.find(stock => stock.Date === date);
    //     return stock ? stock.Open : null;
    // }
}