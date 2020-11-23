import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SetPresentDTO } from './dto/set-present.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userInput: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userInput);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found `);
    }
    return user;
  }

  findByUsername(username: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User ${username} not found `);
    }
    return user;
  }

  async update(id: string, updateUserDTO: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDTO,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne(id);
    return this.usersRepository.delete(user);
  }

  async setPresent(setPresentDTO: SetPresentDTO) {
    const user = await this.usersRepository.preload({
      id: setPresentDTO.id,
      present: setPresentDTO.present,
    });

    if (!user) {
      throw new NotFoundException(`User #${setPresentDTO.id} not found`);
    }
    return this.usersRepository.save(user);
  }
}
