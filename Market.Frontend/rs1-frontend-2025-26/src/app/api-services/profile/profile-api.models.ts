export interface GetProfileDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  isManager: boolean;
  isEmployee: boolean;
}

export interface UpdateProfileCommand {
  firstname: string;
  lastname: string;
  email: string;
}

export interface ChangePasswordCommand {
  currentPassword: string;
  newPassword: string;
}
