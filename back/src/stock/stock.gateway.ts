import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { StockService } from './stock.service';
import { Server } from 'socket.io';

@Controller('/stocks')
@WebSocketGateway(
    { 
        namespace: '/stocks',
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }
    }
)
export class StockGateway {
    @WebSocketServer() server: Server;
    private tradeInterval: NodeJS.Timeout;
    constructor(private readonly stockService: StockService) {}

    @Get()
    findAll() {
        return this.stockService.findAll()
    }

    @SubscribeMessage('stocksSelection')
    handleStocksSelection(@MessageBody() indexes: Array<Number>) {
        return this.server.emit('currentStocksSelection', this.stockService.currentStocks(indexes));
    }

    @SubscribeMessage('getStocksSelection')
    handleGetSelectionsStocks() {
        return this.server.emit('currentStocksSelection', this.stockService.getCurrentStocks());
    }

    @SubscribeMessage('getStocksInfo')
    handleGetStocksInfo(@MessageBody() date: string) {
        return this.server.emit('currentStocksInfo', this.stockService.getCurrentInfo(date));
    }

    @SubscribeMessage('startTrade')
    handleStartTrade(@MessageBody() params: {speed : number, currentDate: string}) {
        this.stockService.blockingTrade = true;
        const dateParts = params.currentDate.split('-');
        const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
        this.tradeInterval = setInterval(() => {
            date.setDate(date.getDate() + params.speed);
            const updatedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
            const stocksData = this.stockService.stocks
                .filter(stock => stock.selected)
                .map(stock => {
                    const data = stock.stock.find(stockItem => stockItem.Date == updatedDate);
                    console.log(stock.id, data);
                    return {
                        id: stock.id,
                        data,
                        newDate: updatedDate
                    };
                });
            this.server.emit('currentStocksInfo', stocksData);
        }, 1000 / params.speed);
    }

    @SubscribeMessage('stopTrade')
    handleStopTrade() {
        this.stockService.blockingTrade = false;
        if (this.tradeInterval) {
            clearInterval(this.tradeInterval);
        }
    }
}
