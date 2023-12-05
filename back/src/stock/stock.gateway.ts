import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
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

    // @SubscribeMessage('startTrade')
    // handleStartTrade(@MessageBody() params: {speed : number, currentDate: string}) {
    //     return this.server.emit('trade', this.stockService.startTrade(params));
    // }
}
