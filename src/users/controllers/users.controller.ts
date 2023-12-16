import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { CreateUserProfileDto } from '../dto/CreateUserProfile.dto';
import { CreateUserPostDto } from '../dto/CreateUserPost.dto';

@Controller('users')
export class UsersController {
  // Inject userService
  constructor(private userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('create')
  createUser(@Body() dataUser: CreateUserDto) {
    return this.userService.createUser(dataUser);
  }

  @Put('edit/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dataUpdate: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, dataUpdate);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  // EndPoint untuk user_profiles
  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dataProfile: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, dataProfile);
  }

  // EndPoint untuk user_posts
  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dataPost: CreateUserPostDto,
  ) {
    return this.userService.createUserPosts(id, dataPost);
  }
}
