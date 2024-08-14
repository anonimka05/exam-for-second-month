import { fetchData } from "../postgress/postgres.js";


// Bu funksiyada barcha buyurtmalarni olishni amalga oshiramiz
export async function getCustomers(req, res) {
  const foundCustomers = await fetchData("SELECT * FROM customer");
  
  res.status(200).send({
    message: "success",
    data: foundCustomers,
  });
}

// Bu funksiyada ma'lum bir buyurtmani ID orqali olishni amalga oshiramiz
export async function getCustomerById(req, res) {
  const { customerId } = req.params;
  
  const foundCustomerById = await fetchData(
    "SELECT * FROM customer WHERE id = $1",
    customerId
  );

  res.status(200).send({
    message: "success",
    data: foundCustomerById,
  });
}

export async function createCustomer(req, res) {
  console.log(req);
  const { name, phone, email, address, category_id } = req.body;

  // Buyurtmani ID orqali olish uchun SQL so'rovi
  const creatCustomers = await fetchData(
    `INSERT INTO customer (name, phone, email, address, category_id) values ($1, $2, $3, $4, $5) RETURNING * `,
    name,
    phone,
    email,
    address,
    category_id
  );
  // console.log(creatCustomers);
  res.status(201).send({
    massage: "successfully created",
    data: creatCustomers,
  });
}

// Bu funksiyada mavjud buyurtmani ID orqali yangilashni amalga oshiramiz
export async function updateCustomerById(req, res) {
  const { name, phone, email, address, category_id } = req.body;
  const { id } = req.params;

  const updatedCustomer = await fetchData(
    "UPDATE customer SET name=$1, phone=$2, email=$3, address=$4, category_id=$5 WHERE id=$6 RETURNING *",
    name,
    phone,
    email,
    address,
    category_id,
    id
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedCustomer,
  });
}

export async function deleteCustomerById(req, res) {
  const { customerId } = req.params;

  const deletedCustomer = await fetchData(
    "DELETE FROM customer WHERE id = $1 RETURNING *",
    customerId
  );

  if (!deletedCustomer.length) {
    res.status(404).send({
      message: "Customer not found!",
    });
    return;
  }

  res.status(200).send({
    message: "successfully deleted",
    data: deletedCustomer,
  });
}
