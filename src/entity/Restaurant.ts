import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MenuItem } from "./MenuItem";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
    menuItems: MenuItem[];
}