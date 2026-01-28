import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('search')
    async searchUsers(@Query('name') name?: string) {
        return this.usersService.searchUsers(name);
    }
}
