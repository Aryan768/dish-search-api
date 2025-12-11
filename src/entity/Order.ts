import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MenuItem } from "./MenuItem";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    // This foreign key allows us to count orders for a specific menu item
    @ManyToOne(() => MenuItem, (menuItem) => menuItem.orders)
    menuItem: MenuItem;
}