import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('whoami')
  async whoAmI(@Session() session: any) {
    return await this.usersService.findOne(session.userId);
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(parseInt(id));
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUserDto.email, createUserDto.password);
    session.userId = user.id;
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(createUserDto.email, createUserDto.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }
}
