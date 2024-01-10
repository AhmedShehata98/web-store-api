import { CreateItemDto } from './dto/item.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private ItemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto) {}
  async read({ limit, page }: { limit: number; page: number }) {}
  async update({ itemId, newData }: { itemId: string; newData: any }) {}
  async delete(itemId: string) {}
}
