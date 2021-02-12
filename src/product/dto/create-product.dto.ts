import {IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    readonly name: string;

    @IsNumber({}, {})
    readonly productNumber: number;

    @IsString({each: true})
    readonly labels: string [];
}
