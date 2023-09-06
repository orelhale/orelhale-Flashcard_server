import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Packet,
  Card,
} from '../models';
import {PacketRepository} from '../repositories';

export class PacketCardController {
  constructor(
    @repository(PacketRepository) protected packetRepository: PacketRepository,
  ) { }

  @get('/packets/{id}/cards', {
    responses: {
      '200': {
        description: 'Array of Packet has many Card',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Card)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Card>,
  ): Promise<Card[]> {
    return this.packetRepository.cards(id).find(filter);
  }

  @post('/packets/{id}/cards', {
    responses: {
      '200': {
        description: 'Packet model instance',
        content: {'application/json': {schema: getModelSchemaRef(Card)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Packet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Card, {
            title: 'NewCardInPacket',
            exclude: ['id'],
            optional: ['packetId']
          }),
        },
      },
    }) card: Omit<Card, 'id'>,
  ): Promise<Card> {
    return this.packetRepository.cards(id).create(card);
  }

  @patch('/packets/{id}/cards', {
    responses: {
      '200': {
        description: 'Packet.Card PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Card, {partial: true}),
        },
      },
    })
    card: Partial<Card>,
    @param.query.object('where', getWhereSchemaFor(Card)) where?: Where<Card>,
  ): Promise<Count> {
    return this.packetRepository.cards(id).patch(card, where);
  }

  @del('/packets/{id}/cards', {
    responses: {
      '200': {
        description: 'Packet.Card DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Card)) where?: Where<Card>,
  ): Promise<Count> {
    return this.packetRepository.cards(id).delete(where);
  }
}
