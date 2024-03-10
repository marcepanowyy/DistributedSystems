import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../utils/helper";
import 'dotenv/config';
import axios from "axios";

export async function authRecaptcha(req: Request, res: Response, next: NextFunction) {

    try {

        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return handleResponse(res, 'error', 401, 'Unauthorized. You are probably a bot.')
        }

        const token = req.headers.authorization.split(' ')[1];
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
        const recaptchaResponse = await axios(verifyUrl);
        const { success } = recaptchaResponse.data;

        if (!success) {
            return handleResponse(res, 'error', 401, 'Unauthorized. You are probably a bot.')
        }

        next();

    }

    catch (error) {
        return handleResponse(res, 'error', 500, 'Internal Server Error');
    }

}