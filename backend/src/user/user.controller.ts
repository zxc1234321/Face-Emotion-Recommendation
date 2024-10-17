import { Body, ConflictException, Controller, Get, Post, Render, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dto/authDto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('/signup')
  async signup(@Body() authDto: AuthDto.SignUp) {
    const { email } = authDto;

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const userEntity = await this.userService.create(authDto);

    return '회원가입성공';
  }
  @UseGuards(AuthGuard())
  @Get('/')
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
}
