import jwt from "jsonwebtoken";

export const isAuthenticated = (
    req,
    res,
    next
) => {

    const token =
        req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login first",
        });
    }

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });

    }
};