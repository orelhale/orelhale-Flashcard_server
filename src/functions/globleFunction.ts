import {PacketRepository} from './../repositories/packet.repository';
import {CardRepository} from '../repositories';

export class GlobleFunction {
  constructor(
    private cardRepository: CardRepository,
    private packetRepository: PacketRepository,
  ) { }


  async deleteCardWithoutPacket() {
    let cards = await this.cardRepository.find({order: ['packetId DESC']})
    let packets = await this.packetRepository.find({})
    console.log("packets == ",packets);
    console.log("cards == ",cards);

    throw new Error('Function not implemented.');
  }
}

