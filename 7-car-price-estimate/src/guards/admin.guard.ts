import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    let canPass = false;
    if (request.currentUser && request.currentUser.admin) {
      canPass = true;
    }

    return canPass;
  }
}