import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';

@Entity({ name: 'user_posts' })
export class UserPosts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  /**
  Ini adalah cara kita mengakses semua posting (UserPost) yang dimiliki oleh satu pengguna (User) yang terkait.
  Artinya, kita mendapatkan daftar semua posting yang dimiliki oleh pengguna tersebut.
*/
  @ManyToOne(() => Users, (user) => user.userposts)
  user: Users;
}
