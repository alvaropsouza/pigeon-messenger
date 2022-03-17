import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(data) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);
    return user;
  }

  async showAll() {
    try {
      return await this.usersRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserById(mail, password) {
    try {
      const matchUser = await this.usersRepository.findOne({ mail, password });
      return matchUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}
