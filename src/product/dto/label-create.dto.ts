import { IsString } from "class-validator";

export class LabelCreateDto {
  @IsString()
  name: string;
}