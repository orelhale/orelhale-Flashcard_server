import {Entity, model, property, hasMany} from '@loopback/repository';
import {Card} from './card.model';

@model()
export class Packet extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  createAt?: number;

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  cardList?: object[];

  @hasMany(() => Card)
  cards: Card[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Packet>) {
    super(data);
  }
}

export interface PacketRelations {
  // describe navigational properties here
}

export type PacketWithRelations = Packet & PacketRelations;
