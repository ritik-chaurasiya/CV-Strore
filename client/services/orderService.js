import axios from "axios";

export const createOrder =
  async (orderData) => {

    return await axios.post(
      "http://localhost:5000/api/orders/create",
      orderData
    );

};

export const getOrders = async () => {
  return await axios.get(
    "http://localhost:5000/api/orders"
  );
};    

export const cancelOrder = async (id) => {
  return await axios.put(
    `http://localhost:5000/api/orders/cancel/${id}`
  );
};

export const updateOrderStatus =
  async (
    id,
    status
  ) => {

    return await axios.put(
      `http://localhost:5000/api/orders/${id}/status`,
      {
        orderStatus:
          status,
      }
    );

  };

export const getRevenue =
    async () => {

        return await axios.get(
            "http://localhost:5000/api/orders/revenue"
        );

    };  