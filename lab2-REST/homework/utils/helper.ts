import { isAxiosError } from "axios";
import { Response } from "express";

export const calories = (protein: number, fat: number, carbs: number) => {
    const result = Math.round(4 * protein + 9 * fat + 4 * carbs);
    return parseFloat(result.toFixed(2));
};

export const handleResponse = (res: Response, view: string, status: number, message?: string) => {
    return res.status(status).render(view , { message, img: `https://http.cat/${status}` });
}

export const handleError = (res: Response, error: any) => {

    if(isAxiosError(error) && error.response){

        // recipe API throws 403 when invalid API
        // nutrition API throws 400 when invalid API

        switch (error.response.status) {

            case 400:
            case 403:
                return handleResponse(res, 'error', 403, 'Invalid API key or not subscribed to API')
            case 404:
                return handleResponse(res, 'error', 404, 'Not found API URL')
            default:
                return handleResponse(res, 'error', 500, 'Internal Server Error')
        }
    }
    return handleResponse(res, 'error', 500, 'Internal Server Error')
}