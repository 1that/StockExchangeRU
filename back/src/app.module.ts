import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokerModule } from './broker/broker.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [BrokerModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
