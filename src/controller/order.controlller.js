import { fetchData } from "../postgress/postgres.js";

// Bu funksiyada barcha buyurtmalarni olishni amalga oshiramiz
export async function getOrders(req, res) {
  // Barcha buyurtmalarni olish uchun SQL so'rovi
  const orders = await fetchData("SELECT * FROM order");

  res.status(200).send({
    message: "success",
    data: orders,
  });
}

// Bu funksiyada ma'lum bir buyurtmani ID orqali olishni amalga oshiramiz
export async function getOrder(req, res) {
  const { orderId } = req.params;

  // Buyurtmani ID orqali olish uchun SQL so'rovi
  const foundedOrder = await fetchData(
    "SELECT * FROM order WHERE id = $1",
    orderId
  );

  res.status(200).send({
    message: "success",
    data: foundedOrder,
  });
}

// Bu funksiyada yangi buyurtma yaratishni amalga oshiramiz
export async function createOrder(req, res) {
  const { product_id, order_date, address, ship_via, customer_id } = req.body;

  // Yangi buyurtmani yaratish uchun SQL so'rovi
  const newOrder = await fetchData(
    "INSERT INTO order (product_id, order_date, address, ship_via, customer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    product_id,
    order_date,
    address,
    ship_via,
    customer_id
  );

  res.status(201).send({
    message: "successfully created",
    data: newOrder,
  });
}

// Bu funksiyada mavjud buyurtmani ID orqali yangilashni amalga oshiramiz
export async function updateOrderById(req, res) {
  const { product_id, order_date, address, ship_via, customer_id } = req.body;
  const { id } = req.params;

  // Buyurtmani yangilash uchun SQL so'rovi
  const updatedOrder = await fetchData(
    "UPDATE order SET product_id=$1, order_date=$2, address=$3, ship_via=$4, customer_id=$5 WHERE id=$6 RETURNING *",
    product_id,
    order_date,
    address,
    ship_via,
    customer_id,
    id
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedOrder,
  });
}

// Bu funksiyada mavjud buyurtmani ID orqali o'chirishni amalga oshiramiz
export async function deleteOrder(req, res) {
  const { orderId } = req.params;

  // O'chiriladigan buyurtmani oldin olish uchun SQL so'rovi
  const foundOrder = await fetchData(
    "SELECT * FROM order WHERE id = $1",
    orderId
  );

  if (!foundOrder.length) {
    res.status(404).send({
      message: "Order not found",
    });
    return;
  }

  // Buyurtmani o'chirish uchun SQL so'rovi
  await fetchData("DELETE FROM order WHERE id = $1", orderId);

  res.status(200).send({
    message: "successfully deleted",
  });
}
