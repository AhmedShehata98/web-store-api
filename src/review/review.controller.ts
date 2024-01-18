import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('/:itemId')
  async handleGetReviews(@Param('itemId') itemId: string) {
    try {
      return await this.reviewService.read(itemId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('/:itemId')
  @UseGuards(JwtAuthGuard)
  async handleAddNewReview(
    @Param('itemId') itemId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      return await this.reviewService.create({ itemId, createReviewDto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('/:itemId')
  @UseGuards(JwtAuthGuard)
  async handleUpdateReview(
    @Param('itemId') itemId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      return await this.reviewService.update({ itemId, updateReviewDto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete('/:itemId')
  @UseGuards(JwtAuthGuard)
  async handleDeleteReview(@Param('itemId') itemId: string) {
    try {
      return await this.reviewService.delete(itemId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
