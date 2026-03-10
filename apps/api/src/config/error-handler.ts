import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpError extends Error {
    status?: number;
    statusCode?: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Sunucu hatası oluştu';
        let errors: unknown = null;

        if (exception instanceof HttpException) {
            // NestJS built-in HttpException
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object' && res !== null) {
                const resObj = res as Record<string, unknown>;
                message = (resObj.message as string) || message;
                errors = resObj.errors || null;
            }
        } else if (exception instanceof Error) {
            const httpErr = exception as HttpError;
            if (httpErr.status && httpErr.status >= 400 && httpErr.status < 600) {
                // http-errors package exception
                status = httpErr.status;
                message = httpErr.message;
            } else {
                this.logger.error(exception.message, exception.stack);
                message = exception.message;
            }
        }

        if (status >= 500) {
            this.logger.error(
                `[${request.method}] ${request.url} - ${status}: ${message}`
            );
        } else {
            this.logger.warn(
                `[${request.method}] ${request.url} - ${status}: ${message}`
            );
        }

        if (response.headersSent) {
            return;
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            errors,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
