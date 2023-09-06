import {CardRepository} from './../repositories/card.repository';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  getModelSchemaRef,
  get,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Packet} from '../models';
import {PacketRepository} from '../repositories';
import {log} from 'console';

export class PacketController {
  constructor(
    @repository(PacketRepository)
    public packetRepository: PacketRepository,
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) { }




  @post('/packets')
  @response(200, {
    description: 'Packet model instance',
    content: {'application/json': {schema: getModelSchemaRef(Packet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packet, {
            title: 'NewPacket',
            exclude: ['id'],
          }),
        },
      },
    })
    packet: Omit<Packet, 'id'>,
  ): Promise<Packet> {
    packet.createAt = Math.round(new Date().getTime() / 1000)
    return this.packetRepository.create(packet);
  }

  @get('/packets/count')
  @response(200, {
    description: 'Packet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Packet) where?: Where<Packet>,
  ): Promise<Count> {
    return this.packetRepository.count(where);
  }

  @get('/packets')
  @response(200, {
    description: 'Array of Packet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Packet, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Packet) filter?: Filter<Packet>,
  ): Promise<Packet[]> {
    return this.packetRepository.find(filter);
  }

  @patch('/packets')
  @response(200, {
    description: 'Packet PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packet, {partial: true}),
        },
      },
    })
    packet: Packet,
    @param.where(Packet) where?: Where<Packet>,
  ): Promise<Count> {
    return this.packetRepository.updateAll(packet, where);
  }

  @get('/packets/{id}')
  @response(200, {
    description: 'Packet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Packet, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Packet, {exclude: 'where'}) filter?: FilterExcludingWhere<Packet>
  ): Promise<Packet> {
    return this.packetRepository.findById(id, filter);
  }

  @patch('/packets/{id}')
  @response(204, {
    description: 'Packet PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packet, {partial: true}),
        },
      },
    })
    packet: Packet,
  ): Promise<void> {
    await this.packetRepository.updateById(id, packet);
  }

  @put('/packets/{id}')
  @response(204, {
    description: 'Packet PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() packet: Packet,
  ): Promise<void> {
    await this.packetRepository.replaceById(id, packet);
  }

  @del('/packets/{id}')
  @response(204, {
    description: 'Packet DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.packetRepository.deleteById(id)
    await this.cardRepository.deleteAll({packetId: id})
  }


  @del('/packets/{id}/andcard')
  @response(204, {
    description: 'Packet DELETE success',
  })
  async deletePacketAndAllCard(
    @param.path.number('id') id: number,
  ): Promise<void> {
    await this.packetRepository.deleteById(id);
  }


  @get('/packets/andcard')
  @response(200, {})
  async andcard(): Promise<any> {
    return this.packetRepository.find(
      {
        where: {},
        include: [{relation: "cards"}]
      }
    )
  }

  @get('/packets/{id}/andcard')
  @response(200, {})
  async ByIdAndcard(@param.path.number('id') id: number): Promise<any> {
    console.log("\n-- orel -- /packets/andcard\n");
    return this.packetRepository.find(
      {
        where: {id: id},
        include: [{relation: "cards"}]
      }
    )
  }


}
