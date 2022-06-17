import { UserEntity } from '@app/user/entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowEntity } from './entity/follow.entity';
import { GroupEntity } from './entity/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity, FollowEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule { }
