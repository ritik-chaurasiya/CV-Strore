import axios from "axios";

export const createOrder =
  async (orderData) => {

    return await axios.post(
      "https://cv-strore.onrender.com/api/orders/create",
      orderData
    );

};

export const getOrders = async () => {
  return await axios.get(
    "https://cv-strore.onrender.com/api/orders"
  );
};    

export const cancelOrder = async (id) => {
  return await axios.put(
    `https://cv-strore.onrender.com/api/orders/cancel/${id}`
  );
};

export const updateOrderStatus =
  async (
    id,
    status
  ) => {

    return await axios.put(
      `https://cv-strore.onrender.com/api/orders/${id}/status`,
      {
        orderStatus:
          status,
      }
    );

  };

export const getRevenue =
    async () => {

        return await axios.get(
            "https://cv-strore.onrender.com/api/orders/revenue"
        );

    };  