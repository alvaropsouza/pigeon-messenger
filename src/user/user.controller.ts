import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Response,
  HttpStatus,
  HttpException,
  Session,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { log } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUsers(@Body() body) {
    try {
      const user = await this.userService.create(body);

      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
        user,
      };
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  @Post('login')
  async loginUser(
    @Req() request: Request,
    @Session() session,
    @Response() response,
  ) {
    const { mail, password } = request.body;

    const user = await this.userService.findUserById(mail, password);

    const { cookie } = session;

    if (user !== undefined) {
      Object.assign(cookie, {
        path: 'http://localhost:5000/user/loginSuccess',
        logged: true,
        mail: mail,
      });

      response.redirect(cookie.path);
    } else {
      response.redirect('http://localhost:5000/user/loginError');
    }
  }

  @Get('users')
  async showAllUsers() {
    const users = await this.userService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }
}
