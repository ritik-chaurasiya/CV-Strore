import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = async (
    req,
    res
) => {
    try {

        const totalProducts =
            await Product.countDocuments();

        const totalOrders =
            await Order.countDocuments();

        const totalUsers =
            await User.countDocuments();

        const orders =
            await Order.find();

        const totalRevenue =
            orders.reduce(
                (acc, order) =>
                    acc + order.totalAmount,
                0
            );

        res.status(200).json({
            success: true,
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


export const getMonthlyRevenue = async (
    req,
    res
) => {

    try {

        const orders =
            await Order.find();

        const monthlyRevenue = {};

        orders.forEach(
            (order) => {

                const month =
                    new Date(
                        order.createdAt
                    ).toLocaleString(
                        "default",
                        {
                            month: "short",
                        }
                    );

                monthlyRevenue[month] =
                    (monthlyRevenue[month] || 0)
                    +
                    order.totalAmount;

            }
        );

        const revenueData =
            Object.keys(
                monthlyRevenue
            ).map(
                (month) => ({
                    month,
                    revenue:
                        monthlyRevenue[
                        month
                        ],
                })
            );

        res.status(200).json({
            success: true,
            revenueData,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message,
        });

    }

};