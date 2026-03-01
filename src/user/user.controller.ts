import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard) // This protects the route!
  @Get('me')
  getMe(@Req() req: Request) {
    // Because of your Strategy, req.user is now populated
    return req.user;
  }
}
