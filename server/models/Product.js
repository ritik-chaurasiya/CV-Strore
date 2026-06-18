import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    public_id: {
    type: String,
    default: "",
},
    reviews: [
     {
       userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
       },
       name: String,
       rating: Number,
       comment: String,
     },
   ],

   numReviews: {
     type: Number,
     default: 0,
   },
   
   averageRating: {
     type: Number,
     default: 0,
   },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);