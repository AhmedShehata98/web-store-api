import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './application.schema';
import { IApplication } from './application.interface';
import { Model } from 'mongoose';
import { UploadService } from 'src/upload/upload.service';
import { Category } from 'src/category/category.schema';
import { User } from 'src/users/user.schema';
import { uid } from 'uid';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<IApplication>,
    private uploadService: UploadService,
  ) {}

  async create({
    createApplicationDto,
    userId,
    images,
  }: {
    userId: string;
    createApplicationDto: CreateApplicationDto;
    images: Express.Multer.File[];
  }) {
    try {
      const application = await new this.applicationModel({
        ...createApplicationDto,
        developer: userId,
        shortId: uid(8),
      }).populate([
        {
          path: 'category',
          select: 'name',
          model: Category.name,
        },
        {
          path: 'developer',
          select: 'fullName profileImageUrl',
          model: User.name,
        },
      ]);
      await application.save();
      return application;
    } catch (error) {
      throw error;
    }
  }
  async readById(applicationId: string) {
    try {
      const application = await this.applicationModel
        .findOne({
          shortId: applicationId,
        })
        .populate([
          {
            path: 'category',
            select: 'name',
            model: Category.name,
          },
          {
            path: 'developer',
            select:
              'fullName profileImageUrl githubProfileUrl linkedinProfileUrl',
            model: User.name,
          },
        ]);
      return application;
    } catch (error) {
      throw error;
    }
  }
  async readMany({ limit, page }: { limit: number; page: number }) {
    try {
      const skip = limit * (page - 1);
      const application = await this.applicationModel
        .find()
        .skip(skip)
        .populate([
          {
            path: 'category',
            select: 'name',
            model: Category.name,
          },
          {
            path: 'developer',
            select: 'fullName profileImageUrl',
            model: User.name,
          },
        ]);
      const count = await this.applicationModel.countDocuments();

      return { application, total: count, currentPage: page, limit };
    } catch (error) {
      throw error;
    }
  }
  async readByCategoryId({
    categoryId,
    limit,
    page,
  }: {
    categoryId: string;
    limit: number;
    page: number;
  }) {
    try {
      const skip = (page - 1) * limit;
      const applications = await this.applicationModel
        .find({ shortId: categoryId })
        .skip(skip);
      const count = await this.applicationModel.countDocuments();
      return {
        applications,
        total: count,
        currentPage: page,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }
  async update({
    applicationId,
    updateApplicationDto,
  }: {
    applicationId: string;
    updateApplicationDto: UpdateApplicationDto;
  }) {
    try {
      const application = await this.applicationModel.findByIdAndUpdate(
        applicationId,
        { ...updateApplicationDto },
      );
      await application.save();
    } catch (error) {
      throw error;
    }
  }
  async delete(applicationId: string) {
    try {
      const application =
        await this.applicationModel.findByIdAndDelete(applicationId);
      return application;
    } catch (error) {
      throw error;
    }
  }
}
