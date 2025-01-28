import dotenv from "dotenv";
import { options } from "./commander.js";

dotenv.config({
    path: options.mode === "production" ? ".env" : ".env.dev"
})

export const config = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL
}