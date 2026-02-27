import { Controller, Get, Patch, Body, UseGuards, Request, Param, ForbiddenException } from '@nestjs/common';
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
    getMe(@Request() req: { user: { sub: number } }) {
        return this.usersService.getMe(req.user.sub);
    }

    @Patch('me')
    @ApiOperation({ summary: 'Profil bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Güncellenen kullanıcı bilgileri' })
    updateMe(@Request() req: { user: { sub: number } }, @Body() dto: UpdateUserDto) {
        return this.usersService.updateMe(req.user.sub, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Sistemdeki tüm kullanıcıları listele (Admin)' })
    @ApiResponse({ status: 200, description: 'Tüm kullanıcı listesi' })
    getAll(@Request() req: { user: { role: string } }) {
        if (req.user.role !== 'admin') {
            throw new ForbiddenException('Bu işlem için yönetici yetkisi gereklidir');
        }
        return this.usersService.getAll();
    }

    @Patch(':id/role')
    @ApiOperation({ summary: 'Kullanıcının rolünü değiştir (Admin)' })
    @ApiResponse({ status: 200, description: 'Güncellenen kullanıcı bilgileri' })
    updateRole(
        @Request() req: { user: { role: string } },
        @Param('id') id: string,
        @Body('role') roleName: string
    ) {
        if (req.user.role !== 'admin') {
            throw new ForbiddenException('Bu işlem için yönetici yetkisi gereklidir');
        }
        return this.usersService.updateRole(+id, roleName);
    }
}
