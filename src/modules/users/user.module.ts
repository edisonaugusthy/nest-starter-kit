import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './infra/database/postgress/user';
import { UserController } from './infra/http/routes/UserController';
import { LoginUserUseCase } from './application/useCases/login/LoginUseCase';
import { UserCommandRepo } from './application/repos/command/UserCommandRepo';
import { UserQueryRepo } from './application/repos/query/UserQueryRepo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [
    LoginUserUseCase,
    { provide: 'IUserCommandRepo', useClass: UserCommandRepo },
    { provide: 'IUserQueryRepo', useClass: UserQueryRepo },
  ],
})
export class UserModule {}
