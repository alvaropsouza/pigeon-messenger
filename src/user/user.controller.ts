import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Response,
  HttpStatus,
  HttpException,
  Session,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import bcrypt = require('bcryptjs');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUsers(@Body() body, @Response() response) {
    try {
      const user = await this.userService.create(body);

      response.redirect('http://localhost:5000/');

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
    const { cookie } = session;

    const user = await this.userService.findUserById(mail);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      response.redirect('http://localhost:5000/user/loginError');
    }

    if (user !== undefined) {
      Object.assign(cookie, {
        path: 'http://localhost:5050',
        logged: true,
        mail: mail,
      });
      response.redirect(cookie.path + `?name=${user.name}&mail=${user.mail}`);
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
