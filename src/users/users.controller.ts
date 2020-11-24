import { Body, Controller, Get, Post } from '@nestjs/common';
import { SecTokenGuard } from 'src/common/guards/sec-token.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SetPresentDTO } from './dto/set-present.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Post('/presence')
  async setPresent(@Body() body: SetPresentDTO) {
    return await this.usersService.setPresent(body);
  }
}
