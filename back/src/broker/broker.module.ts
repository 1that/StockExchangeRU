import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerGateway } from './broker.gateway';

@Module({
    providers: [BrokerGateway, BrokerService],
    controllers: [BrokerGateway]
})
export class BrokerModule {}
