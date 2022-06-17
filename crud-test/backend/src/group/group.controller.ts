import { User } from '@app/user/dto/decorators/user.decorator';
import { AuthGuard } from '@app/user/guard/auth.guard';
import { UserEntity } from '@app/user/entity/user.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupEntity } from './entity/group.entity';
import { GroupService } from './group.service';

@Controller('api/group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }


    @Get()
    async getAll(): Promise<GroupEntity[]> {
        return await this.groupService.getAllGroup();
    }


    @Post('create')
    @UseGuards(AuthGuard)
    async createGroup(@Body() createGroupDto: CreateGroupDto, @User() currenstUser: UserEntity): Promise<GroupEntity | string> {
        return await this.groupService.createGroup(createGroupDto, currenstUser)

    }


    @Put(':name')
    @UseGuards(AuthGuard)
    async updateGroup(@Body() createGroupDto: CreateGroupDto, @Param('name') nameGroup: string): Promise<GroupEntity> {
        return await this.groupService.updateGroup(createGroupDto, nameGroup);
    }


    @Delete(':name')
    @UseGuards(AuthGuard)
    async deleteGroup(@Param('name') name: string, @User('id') currentUserId: number): Promise<DeleteResult> {
        return await this.groupService.deleteGroup(name, currentUserId);
    }




}
