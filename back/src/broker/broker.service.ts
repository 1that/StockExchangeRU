import { Injectable } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { Broker } from './entities/broker.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BrokerService {
    private __dirname = path.resolve().replace('src/broker', '');
    private brokersPath = path.join(this.__dirname, 'data/brokers.json');
    private brokers: Broker[] = JSON.parse(fs.readFileSync(this.brokersPath, 'utf8'));

    create(createBrokerDto: CreateBrokerDto) {
        const id = this.brokers.length > 0 ? this.brokers[this.brokers.length - 1].id + 1 : 1;
        const broker = new Broker(
            id, 
            createBrokerDto.firstName, 
            createBrokerDto.lastName, 
            createBrokerDto.login, 
            createBrokerDto.balance, 
            []
        );
        this.brokers.push(broker);
        fs.writeFileSync(this.brokersPath, JSON.stringify(this.brokers));
        return broker;
    }

    findAll() {
        return this.brokers;
    }

    update(updateBrokerDto: UpdateBrokerDto) {
        const broker = this.brokers.find(b => b.id === updateBrokerDto.id);
        if (broker) {
            broker.balance = updateBrokerDto.balance;
            fs.writeFileSync(this.brokersPath, JSON.stringify(this.brokers));
            return broker;
        }
        return 'Broker not found';
    }

    delete(id: number) {
        console.log('delete');
        const index = this.brokers.findIndex(broker => broker.id === id);
        if (index !== -1) {
            const [brokerToDelete] = this.brokers.splice(index, 1);
            fs.writeFileSync(this.brokersPath, JSON.stringify(this.brokers));
            return brokerToDelete;
        }
        return 'Broker not found';
    }
}
