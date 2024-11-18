import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers: [ProductController],
    providers:[ProductService],
    exports: []
})
export class ProductModule {}