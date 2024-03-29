import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockGateway } from './stock.gateway';

@Module({
    providers: [StockGateway, StockService],
    controllers: [StockGateway]
})
export class StockModule {}
