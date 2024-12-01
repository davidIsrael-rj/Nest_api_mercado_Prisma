import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [
        JwtModule.register({
            secret: "zNaoLA6SbG&/FpNTcQVuic{Lvt$/pji["
        }),
        UserModule,
        PrismaModule,
    ],
    controllers: [AuthController]
})
export class AuthModule {

}