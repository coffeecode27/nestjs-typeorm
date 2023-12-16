import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/entities/Users';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { UserPosts } from 'src/typeorm/entities/UserPosts';

@Module({
  // kita juga harus melakukan import typeormmodule dan entities kedalam module users(agar dapat digunakan)
  imports: [TypeOrmModule.forFeature([Users, UserProfile, UserPosts])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
