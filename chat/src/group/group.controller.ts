import { GroupService } from './group.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('group')
@UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getAll() {
    return this.groupService.getAll();
  }

  @Get('users')
  getAllUsers(@Req() req) {
    return this.groupService.getAllUser(req.user.id);
  }

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto, @Req() req) {
    return this.groupService.createGroup(createGroupDto, req.user.id);
  }
}
