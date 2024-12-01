import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
    imports:[JwtModule.register({
        secret:"zNaoLA6SbG&/FpNTcQVuic{Lvt$/pji["
    })],
    controllers: [AuthController]
})
export class AuthModule {

}