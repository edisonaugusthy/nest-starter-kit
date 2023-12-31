import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('/:userId')
    async getUser(@Param('userId') userId: number){
        return this.userService.findOne(userId)
        
    }
}
