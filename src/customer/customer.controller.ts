import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdatePutCustomerDTO } from "./dto/update-put-customer.dto";
import { UpdatePatchCustomerDTO } from "./dto/update-patch-customer.dto";

@Controller('customer')
export class CustomerController {
    
    @Post()
    async create(@Body() body:CreateCustomerDTO){
        return {body}
    }

    @Get()
    async list(){
        return {customer:[{"id":"1","name":"David Israel"}]}
    }

    @Get('id')
    async show(@Param('id', ParseIntPipe) id:Number){
        return {customer:{}, id}
    }

    @Put(':id')
    async update(@Body() body:UpdatePutCustomerDTO, @Param('id', ParseIntPipe) id: Number){
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body:UpdatePatchCustomerDTO, @Param('id', ParseIntPipe) id: Number){
        return {
            method: 'parch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:Number){
        return {
            id
        }
    }
}