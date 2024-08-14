import { fetchData } from "../postgress/postgres.js";

// Bu funksiyada barcha shartnomalarni olishni amalga oshiramiz
export async function getContracts(req, res) {
  // Barcha shartnomalarni olish uchun SQL so'rovi
  const contracts = await fetchData("SELECT * FROM contract");

  res.status(200).send({
    message: "success",
    data: contracts,
  });
}

// Bu funksiyada ma'lum bir shartnomani ID orqali olishni amalga oshiramiz
export async function getContract(req, res) {
  const { contractId } = req.params;

  // Shartnomani ID orqali olish uchun SQL so'rovi
  const foundedContract = await fetchData(
    "SELECT * FROM contract WHERE id = $1",
    contractId
  );

  res.status(200).send({
    message: "success",
    data: foundedContract,
  });
}

// Bu funksiyada yangi shartnoma yaratishni amalga oshiramiz
export async function createContract(req, res) {
  const {
    contract_date,
    customer_id,
    total_amount,
    monthly_payment,
    order_id,
    contract_type,
  } = req.body;

  // Yangi shartnomani yaratish uchun SQL so'rovi
  const newContract = await fetchData(
    "INSERT INTO contract (contract_date, customer_id, total_amount, monthly_payment, order_id, contract_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    contract_date,
    customer_id,
    total_amount,
    monthly_payment,
    order_id,
    contract_type
  );

  res.status(201).send({
    message: "successfully created",
    data: newContract,
  });
}

// Bu funksiyada mavjud shartnomani ID orqali yangilashni amalga oshiramiz
export async function updateContractById(req, res) {
  const {
    contract_date,
    customer_id,
    total_amount,
    monthly_payment,
    order_id,
    contract_type,
  } = req.body;
  const { id } = req.params;

  // Shartnomani yangilash uchun SQL so'rovi
  const updatedContract = await fetchData(
    "UPDATE contract SET contract_date=$1, customer_id=$2, total_amount=$3, monthly_payment=$4, order_id=$5, contract_type=$6 WHERE id=$7 RETURNING *",
    contract_date,
    customer_id,
    total_amount,
    monthly_payment,
    order_id,
    contract_type,
    id
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedContract,
  });
}

// Bu funksiyada mavjud shartnomani ID orqali o'chirishni amalga oshiramiz
export async function deleteContract(req, res) {
  const { contractId } = req.params;

  // O'chiriladigan shartnomani oldin olish uchun SQL so'rovi
  const foundContract = await fetchData(
    "SELECT * FROM contract WHERE id = $1",
    contractId
  );

  if (!foundContract.length) {
    res.status(404).send({
      message: "Contract not found",
    });
    return;
  }

  // Shartnomani o'chirish uchun SQL so'rovi
  await fetchData("DELETE FROM contract WHERE id = $1", contractId);

  res.status(200).send({
    message: "successfully deleted",
  });
}
