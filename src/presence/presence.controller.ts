import { Controller, Get } from '@nestjs/common';
import { PresenceService } from './presence.service';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Get()
  async findAll() {
    return await this.presenceService.findAll();
  }
}
