import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('supplier')
export class SupplierController {

    @Post()
    async create (@Body() body){
        return {body}
    }

    @Get()
    async list(){
        return{
            supplier:[{"id":"1", "name":"Papelaria China"}]
        }
    }

    @Get(':id')
    async show(@Param() params){
        return{product:{}, params}
    }

    @Put(':id')
    async update(@Body() body, @Param() params){
        return {
            method: 'put',
            body,
            params
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body, @Param() params){
        return {
            method : 'patch',
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params){
        return{
            params
        }
    }


}