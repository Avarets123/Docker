import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { myJwtSecret } from '@app/jwtsecret';
import { IUserResponse } from './interfaces/response-user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { FollowEntity } from '@app/group/entity/follow.entity';
import { FriendsEntity } from './entity/friends.entity';
import { GroupEntity } from '@app/group/entity/group.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(FollowEntity) private readonly followRepository: Repository<FollowEntity>,
        @InjectRepository(FriendsEntity) private readonly friendRepository: Repository<FriendsEntity>,
        @InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>
    ) { }


    async currentUser(currentUserId: number): Promise<{}> {



        const user = await this.userRepository.findOne({ id: currentUserId }, {
            relations: ['createGroup'],
        });

        user.createGroup.map(el => delete el.creator);


        const findFollow = await this.followRepository.find({
            userId: currentUserId
        })

        const findFriend = await this.friendRepository.find({ userId: currentUserId });


        const friends: string[] = [];
        const followGroup: string[] = [];


        for (let i = 0; i < findFriend.length; i++) {
            friends.push((await this.userRepository.findOne({ id: findFriend[i].id })).name);
        }


        for (let i = 0; i < findFollow.length; i++) {
            followGroup.push((await this.groupRepository.findOne({ id: findFollow[i].groupId })).name)
        }



        delete user.password;

        return {
            user,
            followGroup,
            friends
        };

    }


    async getAllUsers(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();

        return users.map(el => {
            delete el.password;
            return el;
        })
    }




    async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {

        const { email, password } = createUserDto;

        const hasUser = await this.userRepository.findOne({ email });

        if (hasUser) {
            throw new HttpException(`User by email: ${email} excist`, HttpStatus.CONFLICT);
        }

        const hashPassword = await hash(password, 8);

        const newUser = new UserEntity();

        Object.assign(newUser, createUserDto);
        newUser.password = hashPassword;

        await this.userRepository.save(newUser);

        delete newUser.password


        return {
            user: { ...newUser },
            token: this.generateToken(newUser)
        }
    }

    private generateToken(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, myJwtSecret, { expiresIn: '3d' });
    }


    async loginUser(loginUser: LoginUserDto): Promise<any> {

        const { email, password } = loginUser;

        const hasUser = await this.userRepository.findOne({ email });

        if (!hasUser) {
            throw new HttpException('User doesnt excist', HttpStatus.FORBIDDEN);
        }


        const validPass = await compare(password, hasUser.password);

        if (!validPass) {
            throw new HttpException('Password dont valid', HttpStatus.BAD_REQUEST);
        }


        delete hasUser.password;

        return {
            user: { ...hasUser },
            token: this.generateToken(hasUser)
        }


    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne(id);
    }


    async addFriend(currentUserId: number, nameFriend: string): Promise<FriendsEntity> {


        const findFriend = await this.userRepository.findOne({ name: nameFriend });

        if (!findFriend) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const addFriend = new FriendsEntity();
        addFriend.userId = currentUserId;
        addFriend.friendId = findFriend.id;
        return await this.friendRepository.save(addFriend);

    }


    async delFriend(currentUserId: number, nameFriend: string): Promise<DeleteResult> {

        const findFriend = await this.userRepository.findOne({ name: nameFriend });

        if (!findFriend) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const findUserAndFriend = this.friendRepository.findOne({
            userId: currentUserId,
            friendId: findFriend.id
        });


        if (!findUserAndFriend) {
            throw new HttpException('Вы не являетесь друзьями', HttpStatus.NOT_FOUND);
        }


        return await this.friendRepository.delete({
            userId: currentUserId,
            friendId: findFriend.id
        })


    }

}

