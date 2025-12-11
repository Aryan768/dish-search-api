import { Request, Response } from 'express';
import { searchTopRestaurants } from '../service/RestaurantService';


export const searchDishes = async (req: Request, res: Response) => {
    try {
        const { name, minPrice, maxPrice } = req.query;

        if (!name || !minPrice || !maxPrice) {
            return res.status(400).json({
                message: "Missing required query parameters: name, minPrice, and maxPrice."
            });
        }

        const dishName = name as string;
        const minP = parseFloat(minPrice as string);
        const maxP = parseFloat(maxPrice as string);

        if (isNaN(minP) || isNaN(maxP)) {
            return res.status(400).json({
                message: "minPrice and maxPrice must be valid numbers."
            });
        }

        const restaurants = await searchTopRestaurants(dishName, minP, maxP);

        // Conform to the required response shape
        return res.json({ restaurants });

    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
};