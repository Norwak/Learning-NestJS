import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessagesRepository) {}

  async findAll() {
    return await this.messagesRepository.findAll();
  }

  async findOne(id: string) {
    return await this.messagesRepository.findOne(id);
  }

  async create(message: string) {
    return await this.messagesRepository.create(message);
  }
}