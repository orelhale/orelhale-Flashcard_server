import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {OrelDbDataSource} from '../datasources';
import {Packet, PacketRelations, Card} from '../models';
import {CardRepository} from './card.repository';

export class PacketRepository extends DefaultCrudRepository<
  Packet,
  typeof Packet.prototype.id,
  PacketRelations
> {

  public readonly cards: HasManyRepositoryFactory<Card, typeof Packet.prototype.id>;

  constructor(
    @inject('datasources.orelDB') dataSource: OrelDbDataSource, @repository.getter('CardRepository') protected cardRepositoryGetter: Getter<CardRepository>,
  ) {
    super(Packet, dataSource);
    this.cards = this.createHasManyRepositoryFactoryFor('cards', cardRepositoryGetter,);
    this.registerInclusionResolver('cards', this.cards.inclusionResolver);
  }
}
