import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Packet} from './packet.model';

@model({settings: {strict: false}})
export class Card extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  question: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  answer?: string;


  @property({
    type: 'number',
    default: 1,
  })
  status?: number;

  @property({
    type: 'number',
  })
  createAt?: number;

  @belongsTo(() => Packet)
  packetId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
