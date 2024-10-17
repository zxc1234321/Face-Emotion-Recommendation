import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt';

@Module({
  imports: [
    forwardRef( () => UserModule),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '300s'},
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthService],
  exports: [PassportModule],
})
export class AuthModule {}
