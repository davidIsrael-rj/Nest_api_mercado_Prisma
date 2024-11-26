import { IsString } from "class-validator";

export class CreateSupplierDTO {
    @IsString()
    name:string;

    @IsString()
    endereco:string;

    @IsString()
    numero:string;

    @IsString()
    bairro:string;

    @IsString()
    cidade:string;

    @IsString()
    estado: string;

    @IsString()
    ie:string;

    @IsString()
    cep:string;

}