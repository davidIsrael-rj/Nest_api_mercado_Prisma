import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: "zNaoLA6SbG&/FpNTcQVuic{Lvt$/pji["
        }),
        forwardRef(()=>UserModule),
        PrismaModule,
    ],
    controllers: [AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {

}