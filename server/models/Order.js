import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    name: {
      type: String,
      required: true,
    },

    email: {
    type: String,
    required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: String,

        name: String,

        price: Number,

        quantity: Number,

        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
      ],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    expectedDelivery: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setDate(
          date.getDate() + 5
        );
        return date;
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Order",
  orderSchema
);