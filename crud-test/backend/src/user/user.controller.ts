import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/decorators/user.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { IUserResponse } from './interfaces/response-user.interface';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { FriendsEntity } from './entity/friends.entity';
import { DeleteResult } from 'typeorm';

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getCurrentUser(@User('id') currentUserId: number) {
        return await this.userService.currentUser(currentUserId);
    }

    @Get('all')
    @UseGuards(AuthGuard)
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
        return await this.userService.createUser(createUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<any> {

        return await this.userService.loginUser(loginUserDto);
    }

    @Get('addfriend/:name')
    @UseGuards(AuthGuard)
    async addFriend(@User('id') currentUserId: number, @Param('name') nameFriend: string): Promise<FriendsEntity> {
        return await this.userService.addFriend(currentUserId, nameFriend);
    }

    @Get('delfriend/:name')
    @UseGuards(AuthGuard)
    async delFriend(@User('id') currentUserId: number, @Param('name') nameFriend: string): Promise<DeleteResult> {
        return await this.userService.delFriend(currentUserId, nameFriend);
    }

}
