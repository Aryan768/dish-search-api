import { AppDataSource } from "../data-source";

import { MenuItem } from "../entity/MenuItem";

import { ILike } from "typeorm";
import { Restaurant } from "../entity/Restaurant";
import { Order } from "../entity/Order";

interface SearchResult {
  restaurantId: number;
  restaurantName: string;
  city: string;
  dishName: string;
  dishPrice: number;
  orderCount: number;
}

export const searchTopRestaurants = async (
  dishName: string,
  minPrice: number,
  maxPrice: number
): Promise<SearchResult[]> => {
  // 1. Get the repository for a simple starting point
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const results = await restaurantRepository
    .createQueryBuilder("restaurant") // Start the query on the Restaurant table

    // 2. Join with MenuItem (which has dish details and price)
    .innerJoin(MenuItem, "menuItem", "menuItem.restaurantId = restaurant.id")

    // 3. Join with Order (to count total orders)
    .innerJoin(Order, "order", "order.menuItemId = menuItem.id")

    // 4. Filter by mandatory dish name and price range
    .where("menuItem.dishName ILIKE :dishName", { dishName: `%${dishName}%` }) // ILIKE is PostgreSQL's case-insensitive LIKE
    .andWhere("menuItem.price >= :minPrice", { minPrice })
    .andWhere("menuItem.price <= :maxPrice", { maxPrice })

    // 5. Select and Group the results
    .select("restaurant.id", "restaurantId")
    .addSelect("restaurant.name", "restaurantName")
    .addSelect("restaurant.city", "city")
    .addSelect("menuItem.dishName", "dishName")
    .addSelect("menuItem.price", "dishPrice")
    .addSelect("COUNT(order.id)", "orderCount") // The crucial aggregation

    .groupBy("restaurant.id")
    .addGroupBy("restaurant.name")
    .addGroupBy("restaurant.city")
    .addGroupBy("menuItem.dishName")
    .addGroupBy("menuItem.price")

    // 6. Order and Limit
    .orderBy('"orderCount"', "DESC")
    .limit(10) // Top 10 restaurants
    .getRawMany<SearchResult>(); // Use getRawMany for aggregate results

  return results;
};
