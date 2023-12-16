import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPosts } from 'src/typeorm/entities/UserPosts';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { Users } from 'src/typeorm/entities/Users';
import {
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
  CreateUserPostParams,
} from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // untuk dapat berinteraksi dengan database, kita harus meng-inject typeorm kedalam service(yg terkait)
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(UserPosts)
    private UserPostsRepository: Repository<UserPosts>,
  ) {}

  getAllUsers() {
    // Secara default, hasil yg dikembalikan tidak akan mencakup relasi yg ada
    // kita harus memasukkan option jika ingin mengembalikan data dari tabel relasi yg terkait
    return this.usersRepository.find({
      relations: ['userProfile', 'userposts'],
    });
  }

  createUser(dataUser: CreateUserParams) {
    const newUser = this.usersRepository.create({
      ...dataUser,
      createdAt: new Date(),
    });
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: number, dataUser: UpdateUserParams) {
    await this.usersRepository.update({ id }, { ...dataUser });
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete({ id });
  }

  // Service untuk handle userProfile
  async createUserProfile(id: number, dataProfile: CreateUserProfileParams) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException(
        'User not found. Fail to create profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUserProfile = this.userProfileRepository.create({
      ...dataProfile,
    });
    const savedProfile = await this.userProfileRepository.save(newUserProfile);
    user.userProfile = savedProfile; // set value untuk property userProfile pada tabel users
    return this.usersRepository.save(user);
  }

  // Service untuk handle userPost
  async createUserPosts(id: number, dataPost: CreateUserPostParams) {
    // langkah awal, cari user berdasarkan id
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException(
        'User not found. Fail to create post',
        HttpStatus.BAD_REQUEST,
      );
    }
    // langkah dua, create dengan cara destructure objeck body, dan tambahkan data untuk property user
    const newPost = this.UserPostsRepository.create({
      ...dataPost,
      user: user,
    });
    // langkah tiga, menyimpan data yg telah di kita create kedalam database
    return this.UserPostsRepository.save(newPost);
  }
}
