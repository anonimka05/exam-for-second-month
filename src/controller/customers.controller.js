import { fetchData } from "../postgress/postgres.js";

export async function getCustomers(req, res) {
  const { customers } = req.params;

  const foundeCustomer = await fetchData(
    "SELECT * FROM customer;",
    customers
  );

  res.send({
    massage: "Success",
    data: foundeCustomer,
  });
}

export async function getCustomerById(req, res) {
    const { customer_id } = req.params;

    const foundeCustomerById = await fetchData(
        "SELECT * FROM customer WHERE id = $1", customer_id
    )

    res.send(({
        massage: "Success",
        data: 
    }))
}