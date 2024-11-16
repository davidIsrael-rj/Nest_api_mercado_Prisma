import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() {email, name, password}: CreateUserDTO) {
        return { email, name, password};
    }

    @Get()
    async list() {
        return { users: [{ "id": "1", "name": "David", }] }
    }

    @Get(':id')
    async show(@Param() param) {
        return { user: {}, param }
    }

    @Put(':id')
    async update(@Body() body, @Param() params) {
        return {
            method: 'put',
            body,
            params
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body, @Param() params) {
        return {
            method: 'patch',
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