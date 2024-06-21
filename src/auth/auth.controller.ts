import { Body, Controller, Get, Post, Redirect, Render, Req, Res, Session, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Response } from 'express';
import { RegistrationUserDto } from 'src/users/dto/registration-user.dto';
import { RefererGuard } from './guards/referer.guard';
import { SessionGuard } from './guards/session.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(SessionGuard)
  @Get('/login')
  @Render('login')
  loginView(@Res() res: Response, @Session() session: Record<string, any>) {
    const error = session.error;
    delete session.error;
    return {
      title: 'Login',
      error: error,
    };
  }

  @Post('/login')
  async login(@Body() userDto: LoginUserDto, @Res() res: Response, @Session() session: Record<string, any>) {
    try {
      const response = await this.authService.login(userDto);
      res.cookie('token', response.token, { httpOnly: true });
      session.user = { id: response.id, email: response.email };
      return res.redirect('/');
    } catch (err) {
      session.error = err.message;
      return res.redirect('/auth/login');
    }
  }

  @UseGuards(SessionGuard)
  @Get('/registration')
  @Render('registration')
  RegisterView() {
    return { title: 'Registration' };
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration(@Body() userDto: RegistrationUserDto, @Res() res: Response, @Session() session: Record<string, any>) {
    const response = await this.authService.registration(userDto);
    res.cookie('token', response.token, { httpOnly: true });
    session.user = { id: response.id, email: response.email };
    return res.redirect('/');
  }

  @UseGuards(RefererGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    res.clearCookie('token');
    session.destroy((err: Error) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Error destroying session');
      }
      return res.redirect('/');
    });
  }
}
