import { fetchData } from "../postgress/postgres.js";
import fs from "fs";
import path from "path";

// Bu funksiyada barcha buyurtmalarni olishni amalga oshiramiz
export async function getProductsByCategory(req, res) {
  const { categoryId } = req.params;

  const foundedProducts = await fetchData(
    "SELECT * FROM product WHERE category_id = $1 RETURNING *",
    categoryId
  );

  res.send({
    message: "success",
    data: foundedProducts,
  });
}
// Bu funksiyada ma'lum bir buyurtmani ID orqali olishni amalga oshiramiz
export async function getProduct(req, res) {
  const { productId } = req.params;

  // Buyurtmani ID orqali olish uchun SQL so'rovi
  const foundedProduct = await fetchData(
    "SELECT * FROM product WHERE id = $1",
    productId
  );

  res.send({
    message: "success",
    data: foundedProduct,
  });
}

export async function createProduct(req, res) {
  const { brend, price, stock_quantity, description, image_url, category_id } =
    req.body;

  const newProduct = await fetchData(
    "INSERT INTO product (brend, price, stock_quantity, description, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    brend,
    price,
    stock_quantity,
    description,
    image_url,
    category_id
  );

  res.status(201).send({
    message: "successfully created",
    data: newProduct,
  });
}

// Bu funksiyada mavjud buyurtmani ID orqali yangilashni amalga oshiramiz
export async function updateProductById(req, res) {
  const { brend, price, stock_quantity, description, image_url, category_id } =
    req.body;
  const { id } = req.params;

  const updatedProduct = await fetchData(
    "UPDATE product SET brend=$1, price=$2, stock_quantity=$3, description=$4, image_url=$5, category_id=$6 WHERE id=$7 RETURNING *",
    brend,
    price,
    stock_quantity,
    description,
    image_url,
    category_id,
    id
  );

  res.status(200).send({
    message: "successfully updated",
    data: updatedProduct,
  });
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;

  const foundProduct = await fetchData(
    "SELECT * FROM product WHERE id = $1",
    productId
  );

  if (!foundProduct.length) {
    res.status(404).send({
      message: "Product not found",
    });
    return;
  }

  if (foundProduct[0]?.image_url) {
    fs.unlink(
      path.join(process.cwd(), "uploads", foundProduct[0]?.image_url),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await fetchData("DELETE FROM product WHERE id = $1 RETURNING *", productId);

  res.status(200).send({
    message: "successfully deleted",
  });
}
