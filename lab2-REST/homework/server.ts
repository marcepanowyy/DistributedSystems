import express, { Request, Response } from 'express';
import { Recipe } from "./models/Recipe";
import { Nutrition } from "./models/Nutrition";
import { RecipeNutrition } from "./models/RecipeNutrition";
import { authRecaptcha } from "./middlewares/recaptcha";
import { calories, handleError, handleResponse } from "./utils/helper";
import { getRecipeOptions, getNutritionOptions } from "./utils/config";

import 'dotenv/config'
import axios from 'axios'; // better to use build in node fetch
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    handleResponse(res, 'index', 200);
});

app.get('/product', authRecaptcha, async (req: Request, res: Response) => {

    const product = req.query.product;

    if(!product || typeof product !== 'string') {
        return handleResponse(res, 'error', 400, 'Invalid query parameter.')
    }

    try {

        const response = await axios.request(getRecipeOptions(product));
        const result: Recipe[] = response.data.results
        const recipes: string[] = result.map((recipe: Recipe) => recipe.display);

        if (recipes.length === 0) {
            return handleResponse(res, 'error', 404, 'Result Not found')
        }

        const nutritions: Nutrition[] = [];

        try {

            const responses = await Promise.all(recipes.map(recipe => axios.request(getNutritionOptions(recipe))));
            nutritions.push(...responses.map(response => response.data[0]).filter(Boolean));

        } catch (error) {
            handleError(res, error)
        }

        const recipesNutrition: RecipeNutrition[] = nutritions.map((nutrition: Nutrition) => {
            return {
                name: nutrition.name,
                calories: calories(nutrition.protein_g, nutrition.fat_total_g, nutrition.carbohydrates_total_g)
            };
        });

        if (recipesNutrition.length === 0) {
            return handleResponse(res, 'error', 404, 'Result Not found')
        }

        res.status(200).render('result', { recipesNutrition, img: 'https://http.cat/200' });

    } catch (error) {
        handleError(res, error)
    }

});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
