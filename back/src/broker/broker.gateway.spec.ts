import { Test, TestingModule } from '@nestjs/testing';
import { BrokerGateway } from './broker.gateway';
import { BrokerService } from './broker.service';

describe('BrokerGateway', () => {
  let gateway: BrokerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerGateway, BrokerService],
    }).compile();

    gateway = module.get<BrokerGateway>(BrokerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
