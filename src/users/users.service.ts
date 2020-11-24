import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateUserDto } from './dto/create-user.dto';
import { SetPresentDTO } from './dto/set-present.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
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
    return this.usersRepository.remove(user);
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

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async resetPresence() {
    this.logger.debug('Called every 5 seconds');
    const users = await this.usersRepository.find();
    const userIds = users.map(user => user.id);
    await this.connection
      .createQueryBuilder()
      .update(User)
      .set({ present: false })
      .where({ id: In(userIds) })
      .execute();
  }
}
