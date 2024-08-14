import { fetchData } from "../postgress/postgres.js";

// Bu funksiyada barcha buyurtma elementlarini olishni amalga oshiramiz
export async function getOrderItems(req, res) {
  // Barcha buyurtma elementlarini olish uchun SQL so'rovi
  const orderItems = await fetchData("SELECT * FROM order_items");

  res.status(200).send({
    message: "success",
    data: orderItems,
  });
}

// Bu funksiyada ma'lum bir buyurtma elementini ID orqali olishni amalga oshiramiz
export async function getOrderItem(req, res) {
  const { orderItemId } = req.params;

  // Buyurtma elementini ID orqali olish uchun SQL so'rovi
  const foundedOrderItem = await fetchData(
    "SELECT * FROM order_items WHERE id = $1",
    orderItemId
  );

  res.status(200).send({
    message: "success",
    data: foundedOrderItem,
  });
}

// Bu funksiyada yangi buyurtma elementi yaratishni amalga oshiramiz
export async function createOrderItem(req, res) {
  const { product_id, quantity, price, orders_id } = req.body;

  // Yangi buyurtma elementini yaratish uchun SQL so'rovi
  const newOrderItem = await fetchData(
    "INSERT INTO order_items (product_id, quantity, price, orders_id) VALUES ($1, $2, $3, $4) RETURNING *",
    product_id,
    quantity,
    price,
    orders_id
  );

  res.status(201).send({
    message: "successfully created",
    data: newOrderItem,
  });
}

// Bu funksiyada mavjud buyurtma elementini ID orqali yangilashni amalga oshiramiz
export async function updateOrderItemById(req, res) {
  const { product_id, quantity, price, orders_id } = req.body;
  const { id } = req.params;

  // Buyurtma elementini yangilash uchun SQL so'rovi
  const updatedOrderItem = await fetchData(
    "UPDATE order_items SET product_id=$1, quantity=$2, price=$3, orders_id=$4 WHERE id=$5 RETURNING *",
    product_id,
    quantity,
    price,
    orders_id,
    id
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedOrderItem,
  });
}

// Bu funksiyada mavjud buyurtma elementini ID orqali o'chirishni amalga oshiramiz
export async function deleteOrderItem(req, res) {
  const { orderItemId } = req.params;

  // O'chiriladigan buyurtma elementini oldin olish uchun SQL so'rovi
  const foundOrderItem = await fetchData(
    "SELECT * FROM order_items WHERE id = $1",
    orderItemId
  );

  if (!foundOrderItem.length) {
    res.status(404).send({
      message: "Order item not found",
    });
    return;
  }

  // Buyurtma elementini o'chirish uchun SQL so'rovi
  await fetchData("DELETE FROM order_items WHERE id = $1", orderItemId);

  res.status(200).send({
    message: "successfully deleted",
  });
}
