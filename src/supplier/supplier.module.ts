import { Module } from "@nestjs/common";
import { SupplierController } from "./supplier.controller";

@Module({
    imports:[],
    controllers: [SupplierController],
    providers:[],
    exports:[]

})
export class SupplierModule {}