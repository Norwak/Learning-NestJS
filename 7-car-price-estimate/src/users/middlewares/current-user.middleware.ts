import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import { User } from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const {userId} = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      if (user) {
        request.currentUser = user;
      }
    }

    next();
  }
}