import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { MenuItem } from "./entity/MenuItem";
import { Restaurant } from "./entity/Restaurant";
import { Order } from "./entity/Order";
dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",

    // --- Use the single DATABASE_URL variable for connection ---
    url: process.env.DATABASE_URL,

    // The following properties are now UNNECESSARY and can be removed/commented out:
    // host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT || "5432"),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,

    synchronize: true,
    logging: false,
    entities: [Restaurant, MenuItem, Order],
    migrations: [],
    subscribers: [],
});