import { IsString } from "class-validator";

export class CreateCustomerDTO {

    @IsString()
    name: string;

    @IsString()
    telefone: string;
    
    @IsString()
    endereco: string;

    @IsString()
    numero:string

    @IsString()
    bairro:string;
    
    @IsString()
    cidade:string;

    @IsString()
    estado:string;
    
    @IsString()
    cpf:string;

    @IsString()
    rg:string;

    @IsString()
    cep:string;
    

}