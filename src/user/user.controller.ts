import { Controller, Get, Post, Body, Patch, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'User registered succesfully!' })
  async createUsers(@Body() data) {
    const user = await this.userService.create(data);

    return user;
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

  @Patch(':user')
  async updateUser(id, data) {
    await this.userService.update(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }
}
