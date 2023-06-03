import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
// Config::set('queue.default', 'database');
// SendEmailToUserOnAddProfit::dispatch($deal);

// \Artisan::call('queue:work', ['--queue' => 'emails', '--stop-when-empty' => 1]);
// // dispatch(new SendEmailToUserOnAddProfit($deal));
