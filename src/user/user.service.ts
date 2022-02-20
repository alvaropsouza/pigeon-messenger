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
  async showAll() {
    return await this.usersRepository.find();
  }

  async create(data) {
    try {
      console.log(data);

      const user = this.usersRepository.create(data);
      await this.usersRepository.save(data);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
