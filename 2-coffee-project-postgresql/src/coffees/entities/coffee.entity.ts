import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // sql table === 'coffee' by default
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', {nullable: true})
  flavors: string[];
}