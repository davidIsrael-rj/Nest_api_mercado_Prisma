import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('customer')
export class CustomerController {
    
    @Post()
    async create(@Body() body){
        return {body}
    }

    @Get()
    async list(){
        return {customer:[{"id":"1","name":"David Israel"}]}
    }

    @Get('id')
    async show(@Param() param){
        return {customer:{}, param}
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
            method: 'parch',
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params){
        return {
            params
        }
    }
}