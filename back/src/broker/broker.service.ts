import { Injectable } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { Broker } from './entities/broker.entity';
import fs from 'fs';
import path from 'path';

@Injectable()
export class BrokerService {
    private __dirname = path.resolve().replace('src/broker', '');
    private brokersPath = path.join(this.__dirname, 'data/brokers.json');
    private brokers: Broker[] = JSON.parse(fs.readFileSync(this.brokersPath, 'utf8'));

    create(createBrokerDto: CreateBrokerDto) {
        const id = this.brokers.length + 1;
        const broker = new Broker(
            id, 
            createBrokerDto.firstName, 
            createBrokerDto.lastName, 
            createBrokerDto.login, 
            createBrokerDto.balance, 
            []
        );
        this.brokers.push(broker);
        return broker;
    }

    findAll() {
        return `This action returns all broker`;
    }

    findOne(id: number) {
        return `This action returns a #${id} broker`;
    }

    update(id: number, updateBrokerDto: UpdateBrokerDto) {
        return `This action updates a #${id} broker`;
    }

    remove(id: number) {
        return `This action removes a #${id} broker`;
    }
}
