import { Module } from "@nestjs/common";
import { SupplierController } from "./supplier.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { SupplierService } from "./supplier.service";

@Module({
    imports:[PrismaModule],
    controllers: [SupplierController],
    providers:[SupplierService],
    exports:[]

})
export class SupplierModule {}