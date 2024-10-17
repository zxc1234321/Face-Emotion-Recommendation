import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends
  PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest:
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    })
  }

  async vaildate(payload: Payload, done: VerifiedCallback): Promise<UserEntity> {
    const { email } = payload;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException({ message: '회원이 존재하지 않습니다.'});
    }

    return user;
  }
}

export interface Payload {
  email: string;
}