import { OmitType } from "@nestjs/mapped-types";
import { Product } from "../entities/product.entity";
import { LabelCreateDto } from "./label-create.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ProductCreateDto extends OmitType(Product, ["labels"]) {
  @ValidateNested({ each: true })
  @Type(() => LabelCreateDto)
  labels: LabelCreateDto[];
}
