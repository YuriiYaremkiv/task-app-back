import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY || 'SECRET_HARD_WORD',
      signOptions: { expiresIn: '720h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
