import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CommonModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
