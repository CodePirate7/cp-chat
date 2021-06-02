import { CommunityService, IAppendDto, ICreateDto } from './community.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('community')
@UseGuards(AuthGuard('jwt'))
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  getAll() {
    return this.communityService.getAllCommunity();
  }

  @Post()
  createCommunity(@Body() createDto: ICreateDto, @Req() req) {
    return this.communityService.createCommunity(createDto, req.user.id);
  }

  @Post('comment')
  appendComment(@Body() appendDto: IAppendDto, @Req() req) {
    return this.communityService.appendComment(appendDto, req.user.id);
  }
}
