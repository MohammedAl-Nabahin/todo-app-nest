import { Catch, NotFoundException } from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class UnknownRouteFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(404).json({
      statusCode: 404,
      message: 'The requested route does not exist',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
