import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.schema';
import { Model } from 'mongoose';
import { IReview } from './review.interface';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { User } from 'src/users/user.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private ReviewModel: Model<IReview>) {}

  async create({
    createReviewDto,
    shortId,
  }: {
    shortId: string;
    createReviewDto: CreateReviewDto;
  }) {
    try {
      const review = await new this.ReviewModel({
        ...createReviewDto,
        applicationShortId: shortId,
      });
      await review.save();
      return review;
    } catch (error) {
      throw error;
    }
  }

  async readMany({
    limit,
    page,
    shortId,
  }: {
    shortId: string;
    limit: number;
    page: number;
  }): Promise<IPaginationObject<IReview[]>> {
    try {
      const skip = (page - 1) * limit;
      const review = await this.ReviewModel.find({
        applicationShortId: shortId,
      })
        .skip(skip)
        .populate({
          path: 'user',
          select: 'fullName profileImageUrl jobTitle usedFramework',
          model: User.name,
        })
        .lean();

      const count = await this.ReviewModel.countDocuments();
      return {
        data: review,
        total: count,
        currentPage: page,
        limit,
        remainingPages: Math.round(count / limit),
        hasNext: Boolean(Math.round(count / limit) > 0),
      };
    } catch (error) {
      throw error;
    }
  }

  async getRecentReview(shortId: string) {
    try {
      const recentReview = await this.ReviewModel.findOne({
        applicationShortId: shortId,
      })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: 'user',
            select: 'fullName profileImageUrl',
            model: User.name,
          },
        ])
        .lean();
      return recentReview;
    } catch (error) {
      throw error;
    }
  }

  async delete(reviewId: string) {
    try {
      const review = await this.ReviewModel.findByIdAndDelete({
        _id: reviewId,
      });
      return review;
    } catch (error) {
      throw error;
    }
  }

  async update({
    reviewId,
    updateReviewDto,
  }: {
    reviewId: string;
    updateReviewDto: UpdateReviewDto;
  }) {
    try {
      const review = await this.ReviewModel.findByIdAndUpdate(
        { _id: reviewId },
        { ...updateReviewDto },
      );
      await review.save();
      return review;
    } catch (error) {
      throw error;
    }
  }
}
