import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "../decorators/param-id.decorator";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";
import { RoleGuard } from "../guards/role.guard";

@UseGuards(RoleGuard) 
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Roles(Role.Admin)    
    @Post()
    async create(@Body()  data:CreateUserDTO) {
        return this.userService.create(data);
    }

    @Roles(Role.Admin)
    @Get()
    async list() {
        return this.userService.list();
    }

    @Roles(Role.Admin)
    @Get(':id')
    async show(@ParamId() id:number) {
        return this.userService.show(id);
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() data:UpdatePutUserDTO, @ParamId() id:number) {
        return this.userService.update(id, data);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDTO,@ParamId() id:number) {
        return this.userService.updatePartial(id, data);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number) {
        return this.userService.delete(id);
    }
}