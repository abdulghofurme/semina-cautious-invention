import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        message: exception?.message,
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Validation error',
        errors: exception,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: exception?.message,
      });
    }
  }
}
