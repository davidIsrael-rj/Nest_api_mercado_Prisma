import { PartialType } from "@nestjs/mapped-types";
import { CreateSectorDTO } from "./create-sector.dto";

export class UpdatePatchSectorDTO extends PartialType(CreateSectorDTO){}