import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('/:shortId')
  async handleGetReviews(
    @Param('shortId') shortId: string,
    @Query('limit', { transform: (val) => parseInt(val) }) limit: number,
    @Query('page', { transform: (val) => parseInt(val) }) page: number,
  ) {
    try {
      return await this.reviewService.readMany({ shortId, limit, page });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('recent/:shortId')
  async handleGetRecentReview(@Param('shortId') itemId: string) {
    try {
      return await this.reviewService.getRecentReview(itemId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('/:shortId')
  @UseGuards(JwtAuthGuard)
  async handleAddNewReview(
    @Param('shortId') shortId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      return await this.reviewService.create({ shortId, createReviewDto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('/:reviewId')
  @UseGuards(JwtAuthGuard)
  async handleUpdateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      return await this.reviewService.update({ reviewId, updateReviewDto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete('/:reviewId')
  @UseGuards(JwtAuthGuard)
  async handleDeleteReview(@Param('reviewId') reviewId: string) {
    try {
      return await this.reviewService.delete(reviewId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
