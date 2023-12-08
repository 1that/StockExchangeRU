import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Stocks } from './entities/stocks.entity';

@Injectable()
export class StockService {
    private __dirname = path.resolve().replace('src/stock', '');
    private stockPath = path.join(this.__dirname, 'data');

    private companies = [
        {companyName: 'Apple, Inc.', companySymbol: 'AAPL', selected: false},
        {companyName: 'Advanced Micro Devices, Inc.', companySymbol: 'AMD', selected: false},
        {companyName: 'Amazon.com, Inc.', companySymbol: 'AMZN', selected: false},
        {companyName: 'Cisco Systems, Inc.', companySymbol: 'CSCO', selected: false},
        {companyName: 'Microsoft, Inc.', companySymbol: 'MSFT', selected: false},
        {companyName: 'QUALCOMM Incorporated', companySymbol: 'QCOM', selected: false},
        {companyName: 'Starbucks, Inc.', companySymbol: 'SBUX', selected: false},
        {companyName: 'Tesla, Inc.', companySymbol: 'TSLA', selected: false}
    ];

    public stocks: Stocks[] = this.companies.map((company, index) => {
        const data = JSON.parse(fs.readFileSync(`${this.stockPath}/${company.companySymbol}.json`, 'utf8'));
        return new Stocks(index + 1, company.companyName, company.companySymbol, data, company.selected);
    });

    public blockingTrade = false;

    findAll() {
        return this.stocks;
    }

    currentStocks(indexes: Array<Number>) {
        this.stocks.forEach(stock => {
            stock.selected = indexes.includes(stock.id);
        });
        return this.stocks
            .filter(stock => stock.selected)
            .map(({id, companyName, companySymbol}) => ({id, companyName, companySymbol}));
    }

    getCurrentStocks() {
        return this.stocks
            .filter(stock => stock.selected)
            .map(({id, companyName, companySymbol}) => ({id, companyName, companySymbol}));
    }

    getCurrentInfo(date: string) {
        return this.stocks
            .filter(stock => stock.selected)
            .map(stock => {
                const data = stock.stock.find(({Date: d}) => d === date);
                return {
                    id: stock.id,
                    data
                };
            });
    }

    startTrade(params: { speed: number, currentDate: string }) {
        // this.blockingTrade = true;
    
        // // Convert string date to Date object
        // const dateParts = params.currentDate.split('-');
        // const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    
        // // Set interval to update date and get stock data
        // const interval = setInterval(() => {
        //     // Increase date by speed days
        //     date.setDate(date.getDate() + params.speed);
    
        //     // Convert updated date back to string
        //     const updatedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
        //     // Get stock data for the updated date
        //     const stocksData = this.stocks
        //         .filter(stock => stock.selected)
        //         .map(stock => {
        //             const stockData = stock.stock.find(stockItem => stockItem.Date === updatedDate);
        //             return {
        //                 id: stock.id,
        //                 companyName: stock.companyName,
        //                 companySymbol: stock.companySymbol,
        //                 data: stockData
        //             };
        //         });
    
        //     // Emit stock data to all clients
        //     this.server.emit('stocksData', stocksData);
    
        //     // Stop interval if trade is blocked
        //     if (!this.blockingTrade) {
        //         clearInterval(interval);
        //     }
        // }, 1000 / params.speed);
    }
}
