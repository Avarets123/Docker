import { UserEntity } from '@app/user/entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { FollowEntity } from './entity/follow.entity';
import { GroupEntity } from './entity/group.entity';

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(FollowEntity) private readonly followRepository: Repository<FollowEntity>
    ) { }


    async getAllGroup(): Promise<GroupEntity[]> {
        const groups = await this.groupRepository.find();
        groups.map(el => delete el.creator.password);
        return groups;
    }



    async createGroup(createGroupDto: CreateGroupDto, currenstUser: UserEntity): Promise<GroupEntity | string> {

        const { name } = createGroupDto;

        const hasGroup = await this.groupRepository.findOne({ name });


        if (hasGroup) {

            const hasFollow = await this.followRepository.findOne({
                userId: currenstUser.id,
                groupId: hasGroup.id
            });


            if (hasFollow) {
                return 'На данную группу вы уже подписаны'
            }

            const follow = new FollowEntity();
            follow.userId = currenstUser.id;
            follow.groupId = hasGroup.id;
            await this.followRepository.save(follow);

            return hasGroup;
        }



        const newGroup = new GroupEntity();
        Object.assign(newGroup, createGroupDto);
        newGroup.creator = currenstUser;
        await this.groupRepository.save(newGroup);





        const follow = new FollowEntity();
        follow.userId = currenstUser.id;
        follow.groupId = newGroup.id;
        await this.followRepository.save(follow);


        return newGroup;

    }

    async updateGroup(createGroupDto: CreateGroupDto, name: string): Promise<GroupEntity> {


        const hasGroup = await this.groupRepository.findOne({ name });

        if (!hasGroup) {
            throw new HttpException(`Group by ${name} dont excist`, HttpStatus.FORBIDDEN);
        }


        Object.assign(hasGroup, createGroupDto);
        return await this.groupRepository.save(hasGroup);

    }

    async deleteGroup(name: string, currentUserId: number): Promise<DeleteResult> {

        const hasGroup = await this.groupRepository.findOne({ name });

        if (!hasGroup) {
            throw new HttpException(`Group by ${name} dont excist`, HttpStatus.FORBIDDEN);
        }

        if (hasGroup.creator.id === currentUserId) {
            return await this.groupRepository.delete({ name });
        } else {
            throw new HttpException('У вас нет прав', HttpStatus.FORBIDDEN);

        }


    }





}
