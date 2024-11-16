import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomerDTO } from "./create-customer.dto";

export class UpdatePatchCustomerDTO extends PartialType(CreateCustomerDTO){}