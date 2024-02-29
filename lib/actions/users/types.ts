declare type CreateUserParams = {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
