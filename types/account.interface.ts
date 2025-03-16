import { RoleEnum } from "$root/enums/RoleEnum";

export interface IAccount {
  username: string;
  password: string;
  email: string;
  role: RoleEnum;
  avatar: string;
  dob: Date;
  isActive: boolean;
}
