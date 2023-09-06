import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OrelDbDataSource} from '../datasources';
import {Card, CardRelations, Packet} from '../models';
import {PacketRepository} from './packet.repository';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.id,
  CardRelations
> {

  public readonly packet: BelongsToAccessor<Packet, typeof Card.prototype.id>;

  constructor(
    @inject('datasources.orelDB') dataSource: OrelDbDataSource, @repository.getter('PacketRepository') protected packetRepositoryGetter: Getter<PacketRepository>,
  ) {
    super(Card, dataSource);
    this.packet = this.createBelongsToAccessorFor('packet', packetRepositoryGetter,);
    this.registerInclusionResolver('packet', this.packet.inclusionResolver);
  }
}
