import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './typeorm/entities/Users';
import { UsersModule } from './users/users.module';
import { UserProfile } from './typeorm/entities/UserProfile';
import { UserPosts } from './typeorm/entities/UserPosts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs_typeorm_lesson',
      entities: [Users, UserProfile, UserPosts],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
