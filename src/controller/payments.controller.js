import { fetchData } from "../postgress/postgres.js";

// Bu funksiyada barcha to'lovlarni olishni amalga oshiramiz
export async function getPayments(req, res) {
  // Barcha to'lovlarni olish uchun SQL so'rovi
  const payments = await fetchData("SELECT * FROM payments");

  res.status(200).send({
    message: "success",
    data: payments,
  });
}

// Bu funksiyada ma'lum bir to'lovni ID orqali olishni amalga oshiramiz
export async function getPayment(req, res) {
  const { paymentId } = req.params;

  // To'lovni ID orqali olish uchun SQL so'rovi
  const foundedPayment = await fetchData(
    "SELECT * FROM payments WHERE id = $1",
    paymentId
  );

  res.status(200).send({
    message: "success",
    data: foundedPayment,
  });
}

// Bu funksiyada yangi to'lov yaratishni amalga oshiramiz
export async function createPayment(req, res) {
  const { payment_date, amount_paid, contract_id } = req.body;

  // Yangi to'lovni yaratish uchun SQL so'rovi
  const newPayment = await fetchData(
    "INSERT INTO payments (payment_date, amount_paid, contract_id) VALUES ($1, $2, $3) RETURNING *",
    payment_date,
    amount_paid,
    contract_id
  );

  res.status(201).send({
    message: "successfully created",
    data: newPayment,
  });
}

// Bu funksiyada mavjud to'lovni ID orqali yangilashni amalga oshiramiz
export async function updatePaymentById(req, res) {
  const { payment_date, amount_paid, contract_id } = req.body;
  const { paymentId } = req.params;

  // To'lovni yangilash uchun SQL so'rovi
  const updatedPayment = await fetchData(
    "UPDATE payments SET payment_date=$1, amount_paid=$2, contract_id=$3 WHERE id=$4 RETURNING *",
    payment_date,
    amount_paid,
    contract_id,
    paymentId
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedPayment,
  });
}

// Bu funksiyada mavjud to'lovni ID orqali o'chirishni amalga oshiramiz
export async function deletePayment(req, res) {
  const { paymentId } = req.params;

  // O'chiriladigan to'lovni oldin olish uchun SQL so'rovi
  const foundPayment = await fetchData(
    "SELECT * FROM payments WHERE id = $1",
    paymentId
  );

  if (!foundPayment.length) {
    res.status(404).send({
      message: "Payment not found",
    });
    return;
  }

  // To'lovni o'chirish uchun SQL so'rovi
  await fetchData("DELETE FROM payments WHERE id = $1", paymentId);

  res.status(200).send({
    message: "successfully deleted",
  });
}
