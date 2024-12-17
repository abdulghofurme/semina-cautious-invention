import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
