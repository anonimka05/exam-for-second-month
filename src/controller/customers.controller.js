import { fetchData } from "../postgress/postgres.js";

export async function getCustomers(req, res) {
  const { customers } = req.params;

  const foundeCustomer = await fetchData("SELECT * FROM customer;", customers);

  res.status(201).send({
    massage: "Success",
    data: foundeCustomer,
  });
}

export async function getCustomerById(req, res) {
  const { customer_id } = req.params;

  const foundeCustomerById = await fetchData(
    "SELECT * FROM customer WHERE id = $1",
    customer_id
  );

  res.status(201).send({
    massage: "Success",
    data: foundeCustomerById,
  });
}

export async function updateCustomerById(req, res) {
  const {
    customer_id,
    customer_name,
    customer_phone,
    customer_email,
    customer_address,
  } = req.params;

  const foundeForUpdate = await fetchData(
    `UPDATE * FROM customer WHERE id=$1 values($2, $3, $4, $5)`,
    customer_id[0]?.customer_id[0] ? customer_id : null,
    customer_name[0]?.customer_name[0] ? customer_name : null,
    customer_phone[0]?.customer_phone[0] ? customer_phone : null,
    customer_email[0]?.customer_email[0] ? customer_email : null,
    customer_address[0]?.customer_address[0] ? customer_address : null
  );

  res.status(201).send({
    massage: "successfully updated",
    data: foundeForUpdate,
  });
}

export async function deleteCustomerByID(req, res) {
  const { customer_id } = req.params;

  const foundeDeleteCustomer = await fetchData(
    `DELETE * from customer WHERE id = $1`,
    customer_id
  );

  if (foundeDeleteCustomer == 0) {
    res.status(404).send({
      massage: "Customer not found!",
    });
  }

  res.status(201).send({
    massage: "successfully deleted",
    data: foundeDeleteCustomer,
  });
}
