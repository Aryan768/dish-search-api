import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { searchDishes } from "./controller/RestaurantController";


const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        // create express app
        const app = express();
        app.use(express.json());

        // register express routes from RestaurantController
        app.get("/search/dishes", searchDishes);

        // start express server
        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}.`);
            console.log("Database connected successfully.");
        });

    })
    .catch(error => console.log("Database connection error:", error));