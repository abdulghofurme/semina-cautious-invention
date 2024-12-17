import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TWebResponse } from 'src/model/web.model';
import { ZodError, ZodIssue } from 'zod';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  zodErrorToKeyedObject(error: ZodError): Record<string, string> {
    return error.errors.reduce(
      (acc, issue) => {
        const key = issue.path.join('.');
        acc[key] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

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
          // errors: exception.getResponse(),
        },
      };
    } else if (exception instanceof ZodError) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        json: {
          message: 'Validation error',
          errors: this.zodErrorToKeyedObject(exception),
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
