import { ConversationService } from './conversation.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';

@Controller('conversation')
@UseGuards(AuthGuard('jwt'))
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  index(@Req() req) {
    return this.conversationService.getAll(req.user.id);
  }

  @Post()
  create(@Req() req, @Body() body: CreateDto) {
    return this.conversationService.createConversation({
      ...body,
      userId: req.user.id,
    });
  }
}
