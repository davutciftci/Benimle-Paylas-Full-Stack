import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @ApiOperation({ summary: 'Giriş yapan kullanıcının profil bilgileri' })
    @ApiResponse({ status: 200, description: 'Kullanıcı bilgileri' })
    getMe(@Request() req: { user: { id: string } }) {
        return this.usersService.getMe(req.user.id);
    }

    @Patch('me')
    @ApiOperation({ summary: 'Profil bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Güncellenen kullanıcı bilgileri' })
    updateMe(@Request() req: { user: { id: string } }, @Body() dto: UpdateUserDto) {
        return this.usersService.updateMe(req.user.id, dto);
    }
}
