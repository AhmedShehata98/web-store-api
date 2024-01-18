import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './application.schema';
import { IApplication } from './application.interface';
import { Model } from 'mongoose';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<IApplication>,
  ) {}

  async create({
    createApplicationDto,
    userId,
  }: {
    userId: string;
    createApplicationDto: CreateApplicationDto;
  }) {
    try {
      const application = await new this.applicationModel({
        ...createApplicationDto,
        developer: userId,
      });
      await application.save();
      return application;
    } catch (error) {
      throw error;
    }
  }
  async readById(applicationId: string) {
    try {
      const application = await this.applicationModel.findOne({
        _id: applicationId,
      });
      return application;
    } catch (error) {
      throw error;
    }
  }
  async readMany({ limit, page }: { limit: number; page: number }) {
    try {
      const skip = limit * (page - 1);
      const application = await this.applicationModel.find().skip(skip);
      const count = await this.applicationModel.countDocuments();

      return { application, total: count, currentPage: page, limit };
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
