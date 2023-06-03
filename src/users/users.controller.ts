import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUser(@Req() req: Request) {
        console.log(req.user)
return 'heelo me'
    }
}
