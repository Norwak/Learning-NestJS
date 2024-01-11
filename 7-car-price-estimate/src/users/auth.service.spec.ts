import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor((Math.random() * 999999)),
          email,
          password
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };
  
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
  
    }).compile();
  
    service = module.get(AuthService);
  });
  
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is already in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(BadRequestException);
  });

  it('throws an error of signin is called with an unused email', async () => {
    await expect(service.signin('qwe@afvd.wer', '12345')).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('qezxv@asdqwe.com', 'rightpassword');
    await expect(service.signin('qezxv@asdqwe.com', 'wrongpassword')).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUsersService.find = () => Promise.resolve([{email: 'asdf@asdf.com', password: '7c92d702f0ae5e6b.04f2b915f0d34474e2e2136258243ff458b67f3615d87d78bbf26a2fdb02c0c6'} as User]);
    await service.signup('asdf@asdf.com', '12345');

    const user = await service.signin('asdf@asdf.com', '12345') ;
    expect(user).toBeDefined();
  });
});