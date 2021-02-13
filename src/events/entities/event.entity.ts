import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EventType } from "./event-type.enum";

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  type: EventType;

  @Column()
  name: string;

  @Column("json")
  payload: Record<string, any>;
}
