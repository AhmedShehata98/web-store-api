import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';

@Module({
  providers: [ItemService],
  imports: [
    MongooseModule.forFeature([{ schema: ItemSchema, name: Item.name }]),
  ],
})
export class ItemModule {}
