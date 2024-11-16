import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdatePutProductDTO } from "./dto/update-put-product.dto";
import { UpdatePatchProductDTO } from "./dto/update-patch-product.dto";

@Controller('product')
export class ProductController {

    @Post()
    async create(@Body() {name, precoVenda, precoCusto,fornecedor,setor}:CreateProductDTO) {
        const precoV = Number(precoVenda) 
        const precoC = Number(precoCusto) 
        return { name, precoV, precoC, fornecedor, setor }
    }

    @Get()
    async list() {
        return {
            product: [
                {
                    "id": "1",
                    "name": "Caderneta",
                    "precoCusto": "1.50",
                    "precoVenda": "2.50",
                    "setor": "papelaria",
                    "fornecedor": "Papelaria China"
                }]
        }
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe)  id) {
        return { product: {}, id }
    }
    @Put(':id')
    async update(@Body() body: UpdatePutProductDTO,@Param('id', ParseIntPipe)  id) {
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body:UpdatePatchProductDTO, @Param('id', ParseIntPipe)  id){
        return{
            method: 'patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)  id){
        return {
            id
        }
    }

}
