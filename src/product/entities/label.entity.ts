import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, IsString } from "class-validator";
import { Product } from "./product.entity";

@Entity()
export class Label {

  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string

  @ManyToMany(type => Product, product => product.labels)
  products: Product[];
}
