import { fetchData } from "../postgress/postgres.js";

// Bu funksiyada barcha shartnoma turlarini olishni amalga oshiramiz
export async function getContractTypes(req, res) {
  // Barcha shartnoma turlarini olish uchun SQL so'rovi
  const contractTypes = await fetchData("SELECT * FROM contract_type");

  res.status(200).send({
    message: "success",
    data: contractTypes,
  });
}

// Bu funksiyada ma'lum bir shartnoma turini ID orqali olishni amalga oshiramiz
export async function getContractType(req, res) {
  const { contractTypeId } = req.params;

  // Shartnoma turini ID orqali olish uchun SQL so'rovi
  const foundedContractType = await fetchData(
    "SELECT * FROM contract_type WHERE id = $1",
    contractTypeId
  );

  res.status(200).send({
    message: "success",
    data: foundedContractType,
  });
}

// Bu funksiyada yangi shartnoma turi yaratishni amalga oshiramiz
export async function createContractType(req, res) {
  const { duration, percentage } = req.body;

  // Yangi shartnoma turini yaratish uchun SQL so'rovi
  const newContractType = await fetchData(
    "INSERT INTO contract_type (duration, percentage) VALUES ($1, $2) RETURNING *",
    duration,
    percentage
  );

  res.status(201).send({
    message: "successfully created",
    data: newContractType,
  });
}

// Bu funksiyada mavjud shartnoma turini ID orqali yangilashni amalga oshiramiz
export async function updateContractTypeById(req, res) {
  const { duration, percentage } = req.body;
  const { id } = req.params;

  // Shartnoma turini yangilash uchun SQL so'rovi
  const updatedContractType = await fetchData(
    "UPDATE contract_type SET duration=$1, percentage=$2 WHERE id=$3 RETURNING *",
    duration,
    percentage,
    id
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedContractType,
  });
}

// Bu funksiyada mavjud shartnoma turini ID orqali o'chirishni amalga oshiramiz
export async function deleteContractType(req, res) {
  const { contractTypeId } = req.params;

  // O'chiriladigan shartnoma turini oldin olish uchun SQL so'rovi
  const foundContractType = await fetchData(
    "SELECT * FROM contract_type WHERE id = $1",
    contractTypeId
  );

  if (!foundContractType.length) {
    res.status(404).send({
      message: "Contract type not found",
    });
    return;
  }

  // Shartnoma turini o'chirish uchun SQL so'rovi
  await fetchData("DELETE FROM contract_type WHERE id = $1", contractTypeId);

  res.status(200).send({
    message: "successfully deleted",
  });
}
