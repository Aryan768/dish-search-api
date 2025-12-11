// src/seed.ts
 
import { AppDataSource } from "./data-source";

import { Restaurant } from "./entity/Restaurant";

import { MenuItem } from "./entity/MenuItem";

import { Order } from "./entity/Order";
 
async function seedDatabase() {

    console.log("Starting database seeding...");
 
    // Initialize the database connection

    await AppDataSource.initialize();

    console.log("Database connection established.");
 
    // --- 1. Create Restaurants ---

    const restaurant1 = new Restaurant();

    restaurant1.name = "Hyderabadi Biryani House";

    restaurant1.city = "Hyderabad";
 
    const restaurant2 = new Restaurant();

    restaurant2.name = "Cheesy Pizza Palace";

    restaurant2.city = "New Delhi";
 
    const restaurant3 = new Restaurant();

    restaurant3.name = "Authentic Pasta Joint";

    restaurant3.city = "Bangalore";
 
    await AppDataSource.manager.save([restaurant1, restaurant2, restaurant3]);

    console.log("3 Restaurants created.");
 
    // --- 2. Create Menu Items ---

    // Restaurant 1: Biryani

    const biryani = new MenuItem();

    biryani.dishName = "Chicken Biryani";

    biryani.price = 250;

    biryani.restaurant = restaurant1;
 
    // Restaurant 2: Pizza

    const pizza = new MenuItem();

    pizza.dishName = "Pepperoni Pizza";

    pizza.price = 400;

    pizza.restaurant = restaurant2;
 
    // Restaurant 3: Pasta

    const pasta = new MenuItem();

    pasta.dishName = "Creamy Pasta";

    pasta.price = 200;

    pasta.restaurant = restaurant3;

    // Restaurant 1: Another Item (to show variety)

    const kebab = new MenuItem();

    kebab.dishName = "Seekh Kebab";

    kebab.price = 150;

    kebab.restaurant = restaurant1;
 
    await AppDataSource.manager.save([biryani, pizza, pasta, kebab]);

    console.log("4 Menu Items created.");

    // --- 3. Create Orders (to test the search logic) ---

    const orders: Order[] = [];
 
    // Orders for Biryani (High Order Count)

    for (let i = 0; i < 50; i++) {

        const order = new Order();

        order.menuItem = biryani;

        orders.push(order);

    }
 
    // Orders for Pasta (Medium Order Count)

    for (let i = 0; i < 30; i++) {

        const order = new Order();

        order.menuItem = pasta;

        orders.push(order);

    }

    // Orders for Pizza (Low Order Count)

    for (let i = 0; i < 5; i++) {

        const order = new Order();

        order.menuItem = pizza;

        orders.push(order);

    }
 
    await AppDataSource.manager.save(orders);

    console.log(`${orders.length} Orders created.`);
 
    await AppDataSource.destroy();

    console.log("Database seeding complete.");

}
 
seedDatabase().catch(error => {

    console.error("Database Seeding Failed:", error);

    AppDataSource.destroy();

});
 