import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Label } from "./label.entity";
import { Type } from "class-transformer";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

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
