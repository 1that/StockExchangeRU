import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerGateway } from './broker.gateway';

@Module({
    providers: [BrokerGateway, BrokerService],
})
export class BrokerModule {}
