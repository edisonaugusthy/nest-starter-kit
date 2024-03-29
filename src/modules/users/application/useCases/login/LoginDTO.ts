import { JWTToken, RefreshToken } from '../../../domain/value-object/jwt';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}
