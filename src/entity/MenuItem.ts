import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Restaurant } from "./Restaurant";
import { Order } from "./Order";


@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dishName: string; // The name of the dish (e.g., "Chicken Biryani")

    @Column("decimal") // Use "decimal" for price to avoid floating point issues
    price: number;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
    restaurant: Restaurant;

    @OneToMany(() => Order, (order) => order.menuItem)
    orders: Order[];
}