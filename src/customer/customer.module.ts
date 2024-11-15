import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";

@Module({
    imports:[],
    controllers:[CustomerController],
    providers:[],
    exports:[]
})
export class CustomerModule {}