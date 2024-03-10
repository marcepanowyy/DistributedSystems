import 'dotenv/config'

export const getRecipeOptions = (product: string) => {

    return {
        method: 'GET',
        url: process.env.RECIPE_API_URL,
        params: { prefix: product },
        headers: {
            'X-RapidAPI-Key': process.env.RECIPE_API_KEY,
            'X-RapidAPI-Host': process.env.RECIPE_HOST
        }
    };

}


export const getNutritionOptions = (recipe: string) => {

    return {
        method: 'GET',
        url: process.env.NUTRITION_API_URL,
        params: { query: recipe },
        headers: { 'X-Api-Key': process.env.NUTRITION_API_KEY }
    };

}