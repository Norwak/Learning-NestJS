import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // TODO: Add protection against wrong ids

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id: string): Promise<Item> | string {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return this.itemsService.update(id, updateItemDto);
    } else {
      return 'Error, wrong ID format';
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
