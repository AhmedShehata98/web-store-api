import { CategoryService } from './category.service';
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
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  async handleGetAllCategory(
    @Query('limit', {
      transform(value, metadata) {
        return parseInt(value);
      },
    })
    limit: number,
    @Query('page', {
      transform(value, metadata) {
        return parseInt(value);
      },
    })
    page: number,
  ) {
    try {
      return await this.categoryService.readMany({ limit, page });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Get(':categoryId')
  async handleGetCategoryById(@Param('categoryId') categoryId: string) {
    try {
      return await this.categoryService.read(categoryId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async handleAddCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Put(':categoryId')
  @UseGuards(JwtAuthGuard)
  async handleUpdateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoryService.update({
        categoryId,
        updateCategoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard)
  async handleDeleteCategory(@Param('categoryId') categoryId: string) {
    try {
      return await this.categoryService.delete(categoryId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
