import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Label } from "./label.entity";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Product name"
  })
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  @IsPositive()
  price: number;

  @Column()
  @IsBoolean()
  available: boolean;

  @Column({default: 0})
  @IsNumber()
  @IsPositive()
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    type => Label,
    label => label.products,
    {
      cascade: true,
    },
  )
  @ValidateNested({ each: true })
  @Type(() => Label)
  labels: Label[];
}
