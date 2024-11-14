import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller('product')
export class ProductController {

    @Post()
    async create(@Body() body) {
        return { body }
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
                },
                {
                    "id": "2",
                    "name": "Caderno",
                    "precoCusto": "2.50",
                    "precoVenda": "3.50",
                    "setor": "papelaria",
                    "fornecedor": "Papelaria China"
                },
            ]
        }
    }

    @Get(':id')
    async show(@Param() param){
        return {product: {}, param}
    }
}
