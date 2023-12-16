// Setiap class (file) entities, merepresentasikan satu tabel dalam database
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfile } from './UserProfile';
import { UserPosts } from './UserPosts';

@Entity({ name: 'users' }) // kita bisa memberikan option / mengisi bagian parameter pada decorator
export class Users {
  // setiap properti yg kita buat, akan merepresentasikan kolom didalam tabelnya
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  // Setup relasi one-to-one antara entities atau tabel users ke tabel user_profiles
  // note : karena relasinya 'ditarik' dari tabel users, maka kita tidak perlu melakukan apa-apa lagi pada tabel user_profiles
  @OneToOne(() => UserProfile)
  // join column akan membuat kolom id dari tabel target (yaitu profile), akan ditampilkan atau ditambahkan
  // kedalam tabel users
  @JoinColumn()
  userProfile: UserProfile;

  /**
    Ini adalah cara kita mengakses objek User yang terkait dengan setiap objek UserPost.
    Artinya, setiap posting (UserPost) pasti memiliki satu pengguna (User) yang terkait dengannya.
    Dan tabel Users ini berperan sebagai entitas induk

    Dengan demikian, kita memiliki hubungan yang lengkap antara entitas "induk" (User)
    dan entitas "anak" (UserPost) dalam hubungan one-to-many yang memungkinkan kita untuk dengan mudah 
    mengakses informasi yang kita butuhkan dari kedua sisi hubungan tersebut.
   */
  @OneToMany(() => UserPosts, (post) => post.user)
  userposts: UserPosts[];
}
