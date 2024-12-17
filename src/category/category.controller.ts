import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryResponse } from 'src/model/category.model';
import { WebResponse } from 'src/model/web.model';
import {
  CategoryValidation,
  TCategoryRequestPayload,
} from './category.validation';
import { CategoryService } from './category.service';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payloadRequest: TCategoryRequestPayload,
  ): Promise<WebResponse<CategoryResponse>> {
    const payload = CategoryValidation.CREATE.parse(payloadRequest);

    const result = await this.categoryService.create(payload);
    return { data: result };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async index(): Promise<WebResponse<CategoryResponse[]>> {
    const result = await this.categoryService.index();
    return { data: result };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id') id: string): Promise<WebResponse<CategoryResponse>> {
    const result = await this.categoryService.find(id);
    return { data: result };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() payloadRequest: TCategoryRequestPayload,
  ): Promise<WebResponse<CategoryResponse>> {
    const payload = CategoryValidation.CREATE.parse(payloadRequest);

    const result = await this.categoryService.update(id, payload);
    return { data: result };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async destroy(
    @Param('id') id: string,
  ): Promise<WebResponse<CategoryResponse>> {
    const result = await this.categoryService.destroy(id);
    return { data: result };
  }
}
