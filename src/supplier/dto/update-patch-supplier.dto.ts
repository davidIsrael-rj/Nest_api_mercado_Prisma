import { PartialType } from "@nestjs/mapped-types";
import { CreateSupplierDTO } from "./create-supplier.dto";

export class UpdatePatchSupplierDTO extends PartialType(CreateSupplierDTO){}