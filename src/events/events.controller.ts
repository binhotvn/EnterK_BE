import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

import { UtilsService } from 'src/utils/utils.service';
import { EventsService } from './events.service';
@Controller('chat_history')
export class ChatController {
  constructor(
    private readonly utils: UtilsService,
    private readonly events: EventsService
  ) {}

  @Get()
   info() {
    return this.events.getAllChat();
  }
}
