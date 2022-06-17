import { FollowEntity } from '@app/group/entity/follow.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './guard/auth.guard';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { FriendsEntity } from './entity/friends.entity';
import { GroupEntity } from '@app/group/entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity, FriendsEntity, GroupEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService]
})
export class UserModule { }
