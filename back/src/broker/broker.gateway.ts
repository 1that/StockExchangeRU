import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { BrokerService } from './broker.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { Server } from 'socket.io';
import { Controller, Post, Get, Body, Param } from '@nestjs/common';

@Controller('/brokers')
@WebSocketGateway({
    namespace: '/brokers',
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
    },
})
export class BrokerGateway {
    @WebSocketServer() server: Server;
    constructor(private readonly brokerService: BrokerService) {}

    @SubscribeMessage('createBroker')
    create(@MessageBody() createBrokerDto: CreateBrokerDto) {
        return this.server.emit('create', this.brokerService.create(createBrokerDto));
    }

    @SubscribeMessage('findAllBroker')
    findAll() {
        return this.brokerService.findAll();
    }

    @SubscribeMessage('updateBalance')
    update(@MessageBody() updateBrokerDto: UpdateBrokerDto) {
        return this.brokerService.update(updateBrokerDto);
    }
    
    @SubscribeMessage('deleteBroker')
    delete(@MessageBody() id: number) {
        return this.server.emit('delete', this.brokerService.delete(id));
    }

    @Get(':id')
    findOne(@Param() params: any) {
        return this.brokerService.findOne(Number(params.id));
    }

    @Post()
    checkBroker(@Body() body: any) {
        return this.brokerService.checkBroker(body);
    }
}
