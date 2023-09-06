import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Shlomi extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nmae: string;

  @property({
    type: 'string',
    default: 'dfgfdg',
  })
  idU?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Shlomi>) {
    super(data);
  }
}

export interface ShlomiRelations {
  // describe navigational properties here
}

export type ShlomiWithRelations = Shlomi & ShlomiRelations;
