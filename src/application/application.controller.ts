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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { Request as ExpressRequest } from 'express';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('all')
  async handleGetAllApplication(
    @Query('limit', { transform: (value) => parseInt(value) }) limit: number,
    @Query('page', { transform: (value) => parseInt(value) }) page: number,
  ) {
    try {
      return await this.applicationService.readMany({ limit, page });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('/:applicationId')
  async handleGetApplication(@Param('applicationId') applicationId: string) {
    try {
      return await this.applicationService.readById(applicationId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async handleAddNewApplication(
    @Req() req: ExpressRequest,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.applicationService.create({
        userId,
        createApplicationDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Put('/:applicationId')
  @UseGuards(JwtAuthGuard)
  async handleUpdateApplication(
    @Param('applicationId') applicationId: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    try {
      return await this.applicationService.update({
        applicationId,
        updateApplicationDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete('/:applicationId')
  @UseGuards(JwtAuthGuard)
  async handleDeleteApplication(@Param('applicationId') applicationId: string) {
    try {
      return await this.applicationService.delete(applicationId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
