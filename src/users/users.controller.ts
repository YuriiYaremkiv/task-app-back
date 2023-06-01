import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'common/guards/accessToken.guard';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  getUserById(@Request() req: any) {
    const user = req.user;
    return this.userService.getUserById(user.id);
  }
}
