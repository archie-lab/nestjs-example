import { ProductCreateDto } from "./product-create.dto";
import { PartialType } from "@nestjs/swagger";

export class ProductUpdateDto extends PartialType(ProductCreateDto) {
}
