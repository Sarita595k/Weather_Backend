import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // max 5 requests per IP in 10 minutes
    message: "Too many requests from this IP, please try again later."
});