import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiNegativeResponses } from '@app/shared/decorators/responses.decorator';
import { LoginUserUseCase } from 'src/modules/users/application/useCases/login/LoginUseCase';
import { LoginUserRequest } from '../../dto/user';
import { LoginUseCaseErrors } from 'src/modules/users/application/useCases/login/LoginErrors';
import { LoginDTO } from 'src/modules/users/application/useCases/login/LoginDTO';

@Controller('user')
@ApiTags('User')
@ApiNegativeResponses()
export class UserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login User', description: 'Login User' })
  @ApiBody({ type: LoginUserRequest })
  @ApiResponse({
    status: 200,
    description: 'User Logged In',
    type: null,
  })
  async getUser(@Body() body: LoginDTO) {
    const response = await this.loginUserUseCase.execute(body);
    if (response.isFailed()) {
      const error = response.value;
      switch (error.constructor) {
        case LoginUseCaseErrors.PasswordDoesntMatchError:
          throw new HttpException(error.getErrorValue(), 403);
        case LoginUseCaseErrors.UserNameDoesntExistError:
          throw new HttpException(error.getErrorValue(), 401);
        default:
          throw new HttpException(error.getErrorValue(), 500);
      }
    }
    return response.value.getValue();
  }
}
