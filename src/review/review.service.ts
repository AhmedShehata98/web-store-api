import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.schema';
import { Model } from 'mongoose';
import { IReview } from './review.interface';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private ReviewModel: Model<IReview>) {}

  async create({
    createReviewDto,
    itemId,
  }: {
    itemId: string;
    createReviewDto: CreateReviewDto;
  }) {
    try {
      const review = await new this.ReviewModel({
        ...createReviewDto,
        itemId,
      });
      await review.save();
      return review;
    } catch (error) {
      throw error;
    }
  }

  async read(itemId: string) {
    try {
      const review = await this.ReviewModel.find({ _id: itemId });
      return review;
    } catch (error) {
      throw error;
    }
  }

  async delete(itemId: string) {
    try {
      const review = await this.ReviewModel.findByIdAndDelete({ _id: itemId });
      return review;
    } catch (error) {
      throw error;
    }
  }

  async update({
    itemId,
    updateReviewDto,
  }: {
    itemId: string;
    updateReviewDto: UpdateReviewDto;
  }) {
    try {
      const review = await this.ReviewModel.findByIdAndUpdate(
        { _id: itemId },
        { ...updateReviewDto },
      );
      await review.save();
      return review;
    } catch (error) {
      throw error;
    }
  }
}
