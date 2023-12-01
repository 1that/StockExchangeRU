import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BrokerService } from './broker.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';

@WebSocketGateway({
    namespace: '/brokers',
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    },
})
export class BrokerGateway {
    constructor(private readonly brokerService: BrokerService) {}

    @SubscribeMessage('createBroker')
    create(@MessageBody() createBrokerDto: CreateBrokerDto) {
        return this.brokerService.create(createBrokerDto);
    }

    // @SubscribeMessage('findAllBroker')
    // findAll() {
    //     return this.brokerService.findAll();
    // }

    // @SubscribeMessage('findOneBroker')
    // findOne(@MessageBody() id: number) {
    //     return this.brokerService.findOne(id);
    // }

    // @SubscribeMessage('updateBroker')
    // update(@MessageBody() updateBrokerDto: UpdateBrokerDto) {
    //     return this.brokerService.update(updateBrokerDto.id, updateBrokerDto);
    // }

    // @SubscribeMessage('removeBroker')
    // remove(@MessageBody() id: number) {
    //     return this.brokerService.remove(id);
    // }
}
