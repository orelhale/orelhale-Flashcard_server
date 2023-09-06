import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Card,
  Packet,
} from '../models';
import {CardRepository} from '../repositories';

export class CardPacketController {
  constructor(
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) { }

  @get('/cards/{id}/packet', {
    responses: {
      '200': {
        description: 'Packet belonging to Card',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Packet),
          },
        },
      },
    },
  })
  async getPacket(
    @param.path.number('id') id: typeof Card.prototype.id,
  ): Promise<Packet> {
    return this.cardRepository.packet(id);
  }
}
