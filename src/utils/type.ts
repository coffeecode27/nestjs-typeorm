export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstname: string;
  lastname: string;
  age: number;
  birthday: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};
