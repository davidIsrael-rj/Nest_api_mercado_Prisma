import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService){}

    canActivate(context: ExecutionContext) {

      const {authorization} = context.switchToHttp().getRequest().headers;
      console.log({authorization});

      return this.authService.checkToken((authorization ?? '').split(' ')[1] );
        // return true;
    }
}