import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { ICategory } from './category.interface';
import { uid } from 'uid';
import { isObjectId } from 'src/utils/is-valid-objectId';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<ICategory>,
  ) {}

  async read(categoryId: string) {
    try {
      if (isObjectId(categoryId)) {
        const category = await this.categoryModel.findById(categoryId);
        return category;
      }
      const category = await this.categoryModel.findOne({
        shortId: categoryId,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }
  async readById(categoryId: string) {
    try {
      const category = await this.categoryModel.findOne({ _id: categoryId });
      return category;
    } catch (error) {
      throw error;
    }
  }
  async readMany({ limit = 8, page = 1 }: { limit: number; page: number }) {
    try {
      const skip = limit * (page - 1);
      const category = await this.categoryModel.find().skip(skip);
      return category;
    } catch (error) {
      throw error;
    }
  }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await new this.categoryModel({
        ...createCategoryDto,
        shortId: uid(8),
      });
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  }
  async update({
    categoryId,
    updateCategoryDto,
  }: {
    categoryId: string;
    updateCategoryDto: UpdateCategoryDto;
  }) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(categoryId, {
        ...updateCategoryDto,
      });
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  }
  async delete(categoryId: string) {
    try {
      const category = await this.categoryModel.findByIdAndDelete(categoryId);

      return category;
    } catch (error) {
      throw error;
    }
  }
}
