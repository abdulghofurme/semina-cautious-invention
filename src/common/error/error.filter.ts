import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TWebResponse } from 'src/model/web.model';
import { ZodError } from 'zod';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    let result: {
      status: HttpStatus;
      json: TWebResponse;
    };

    if (exception instanceof HttpException) {
      result = {
        status: exception.getStatus(),
        json: {
          message: exception?.message,
          errors: exception.getResponse(),
        },
      };
    } else if (exception instanceof ZodError) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        json: {
          message: 'Validation error',
          errors: exception,
        },
      };
    } else {
      result = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        json: {
          message: exception?.message,
        },
      };
    }

    response.status(result.status).json(result.json);
  }
}
