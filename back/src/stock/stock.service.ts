import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
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
    ]

    public stocks: Stocks[] = this.companies.map((company, index) => {
        const data = JSON.parse(fs.readFileSync(`${this.stockPath}/${company.companySymbol}.json`, 'utf8'));
        return new Stocks(index + 1, company.companyName, company.companySymbol, data, company.selected);
    });

    findAll() {
        return this.stocks;
    }

    currentStocks(indexes: Array<Number>) {
        return this.stocks.filter(stock => indexes.includes(stock.id));
    }
}
