import { MessagesRepository } from "./messages.repository";

export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    // Service is createing its own dependencies
    // DON'T DO THIS ON REAL APPS
    this.messagesRepo = new MessagesRepository();
  }

  async findAll() {
    return await this.messagesRepo.findAll();
  }

  async findOne(id: string) {
    return await this.messagesRepo.findOne(id);
  }

  async create(message: string) {
    return await this.messagesRepo.create(message);
  }
}