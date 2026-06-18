import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (
  req,
  res
) => {
  try {

    const order =
      await Order.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: "Cancelled",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order Cancelled",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// export const updateOrderStatus =
//   async (req, res) => {

//     try {

//       const { id } =
//         req.params;

//       const {
//         orderStatus,
//       } = req.body;

//       const order =
//         await Order.findByIdAndUpdate(
//           id,
//           {
//             orderStatus,
//           },
//           {
//             new: true,
//           }
//         );

//       res.status(200).json({
//         success: true,
//         order,
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message:
//           error.message,
//       });

//     }
// };

export const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Stock reduce only once
        if (
            orderStatus === "Delivered" &&
            order.orderStatus !== "Delivered"
        ) {

           for (const item of order.items) {

    const product =
        await Product.findById(
            item.productId
        );

    if (!product) continue;

    if (product.stock < item.quantity) {
        return res.status(400).json({
            success: false,
            message: `${product.name} out of stock`,
        });
    }

    await Product.findByIdAndUpdate(
        item.productId,
        {
            $inc: {
                stock: -item.quantity,
            },
        }
    );
}
        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {

        console.log("ORDER STATUS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



  // controller
export const getMyOrders = async (req, res) => {

    const orders = await Order.find({
        userId: req.params.userId,
    });

    res.json({
        success: true,
        orders,
    });
};

export const getRevenue = async (
    req,
    res
) => {

    try {

        const orders =
            await Order.find();

        const totalRevenue =
            orders.reduce(
                (acc, order) =>
                    acc +
                    order.totalAmount,
                0
            );

        const totalOrders =
            orders.length;

        const deliveredOrders =
            orders.filter(
                (order) =>
                    order.orderStatus ===
                    "Delivered"
            ).length;

        const pendingOrders =
            orders.filter(
                (order) =>
                    order.orderStatus ===
                    "Pending"
            ).length;

        const recentOrders =
            orders
                .sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ) -
                        new Date(
                            a.createdAt
                        )
                )
                .slice(0, 5);

        const customerRevenue = {};

        orders.forEach(
            (order) => {

                if (
                    customerRevenue[
                    order.name
                    ]
                ) {

                    customerRevenue[
                        order.name
                    ] +=
                        order.totalAmount;

                } else {

                    customerRevenue[
                        order.name
                    ] =
                        order.totalAmount;

                }

            }
        );

        const topCustomers =
            Object.entries(
                customerRevenue
            )
                .map(
                    (
                        [
                            name,
                            amount,
                        ]
                    ) => ({
                        name,
                        amount,
                    })
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b.amount -
                        a.amount
                )
                .slice(0, 5);

        res.status(200).json({
            success: true,
            totalRevenue,
            totalOrders,
            deliveredOrders,
            pendingOrders,
            recentOrders,
            topCustomers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message,
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

        const months = {};

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

                months[month] =
                    (months[month] || 0)
                    +
                    order.totalAmount;

            }
        );

        const revenueData =
            Object.keys(months).map(
                (month) => ({
                    month,
                    revenue:
                        months[month],
                })
            );

        res.json({
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