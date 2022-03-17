import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(data) {
    const userRegisterIntention = data;
    userRegisterIntention.password = bcrypt.hashSync(
      userRegisterIntention.password,
      10,
    );
    const user = this.usersRepository.create(userRegisterIntention);
    await this.usersRepository.save(userRegisterIntention);
    return user;
  }

  async showAll() {
    try {
      return await this.usersRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserById(mail) {
    try {
      const matchUser = await this.usersRepository.findOne({ mail });
      return matchUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}
