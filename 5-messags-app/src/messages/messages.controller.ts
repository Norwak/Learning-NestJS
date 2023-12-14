import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  async listMessages() {
    return await this.messagesService.findAll();
  }

  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    
    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto.message);
  }
}
