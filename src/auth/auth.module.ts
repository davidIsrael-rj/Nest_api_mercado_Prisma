import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({
        secret:"zNaoLA6SbG&/FpNTcQVuic{Lvt$/pji["
    })]
})
export class AuthModule {

}