import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller('supplier')
export class SupplierController {

    @Post()
    async create (@Body() body){
        return {body}
    }

   


}