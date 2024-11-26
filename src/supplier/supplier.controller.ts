import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateSupplierDTO } from "./dto/create-supplier.dto";
import { UpdatePutSupplierDTO } from "./dto/update-put-supplier.dto";
import { UpdatePatchSupplierDTO } from "./dto/update-patch-supplier.dto";
import { SupplierService } from "./supplier.service";

@Controller('supplier')
export class SupplierController {
constructor(private readonly supplierService: SupplierService){}
    @Post()
    async create (@Body() data:CreateSupplierDTO){
        return this.supplierService.create(data);
    }

    @Get()
    async list(){
        return this.supplierService.listar();
    }

    @Get(':id')
    async show(@Param('id',ParseIntPipe) id:number){
        return this.supplierService.show(id);
    }

    @Put(':id')
    async update(@Body() body:UpdatePutSupplierDTO, @Param('id', ParseIntPipe) id:number){
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchSupplierDTO, @Param('id', ParseIntPipe) id:number){
        return {
            method : 'patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return{
            id
        }
    }


}