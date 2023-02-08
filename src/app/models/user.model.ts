export interface UserModel {
  uid: string;
  email: string;
  password: string;
  isAdmin: boolean;
  created_at: Date;
  updated_at: Date;
}
