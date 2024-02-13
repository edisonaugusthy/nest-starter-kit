import { ApiProperty } from '@nestjs/swagger';

export interface UserDTO {
  username: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isDeleted?: boolean;
}

export class LoginUserRequest {
  @ApiProperty({ description: 'UserName', example: '1213121' })
  userName: string;
  @ApiProperty({ description: 'Password', example: '!@#$HJ@$' })
  passWord: string;
}
