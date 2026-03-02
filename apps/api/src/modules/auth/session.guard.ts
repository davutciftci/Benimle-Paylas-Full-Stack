import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        
        if (request.session && request.session.user) {
            // Assign session user to request user to maintain compatibility with @CurrentUser decorator
            request.user = request.session.user;
            return true;
        }

        throw new UnauthorizedException('Oturum süresi dolmuş veya yetkiniz yok');
    }
}
