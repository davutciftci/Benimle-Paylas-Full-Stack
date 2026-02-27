import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Yeni kullanıcı kaydı' })
    @ApiResponse({ status: 201, description: 'Başarıyla kayıt olundu' })
    @ApiResponse({ status: 409, description: 'E-posta zaten kullanımda' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Kullanıcı girişi' })
    @ApiResponse({ status: 200, description: 'Başarıyla giriş yapıldı' })
    @ApiResponse({ status: 401, description: 'Geçersiz kimlik bilgileri' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Şifre sıfırlama e-postası gönder' })
    @ApiResponse({ status: 200, description: 'E-posta gönderildi' })
    forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Şifreyi sıfırla' })
    @ApiResponse({ status: 200, description: 'Şifre güncellendi' })
    @ApiResponse({ status: 404, description: 'Geçersiz token' })
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }
}
