import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  CategoryRequestPayload,
  CategoryResponse,
} from 'src/model/category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  parseToCategoryResponse(category: CategoryResponse): CategoryResponse {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  async checkIsCategoryExist(id: string): Promise<Category> {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!category)
      throw new HttpException('kategori tidak ditemukan', HttpStatus.NOT_FOUND);

    return category;
  }

  async create(payload: CategoryRequestPayload): Promise<CategoryResponse> {
    const category = await this.prismaService.category.create({
      data: payload,
    });

    return this.parseToCategoryResponse(category);
  }

  async index(): Promise<CategoryResponse[]> {
    const categories = await this.prismaService.category.findMany();

    return categories.map((category) => this.parseToCategoryResponse(category));
  }

  async find(id: string): Promise<CategoryResponse> {
    const category = await this.checkIsCategoryExist(id);

    return this.parseToCategoryResponse(category);
  }

  async update(
    id: string,
    payload: CategoryRequestPayload,
  ): Promise<CategoryResponse> {
    let category = await this.checkIsCategoryExist(id);

    category = await this.prismaService.category.update({
      where: {
        id,
      },
      data: payload,
    });

    return this.parseToCategoryResponse(category);
  }

  async destroy(id: string): Promise<CategoryResponse> {
    await this.checkIsCategoryExist(id);

    const category = await this.prismaService.category.delete({
      where: {
        id,
      },
    });

    return this.parseToCategoryResponse(category);
  }
}
