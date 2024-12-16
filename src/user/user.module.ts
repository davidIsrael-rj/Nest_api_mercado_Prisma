import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { IdCheckMiddleware } from "../middlewares/id-check.middleware";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [PrismaModule, forwardRef(()=>AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(IdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}