import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/authDto.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // login
  @Post('/signin')
  async signin(@Body() authDTO: AuthDto.SignIn) {
    const {email, password} = authDTO;

    const user = await
      this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const payload = {
      id: user.id,
    }

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
