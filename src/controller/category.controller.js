import { fetchData } from "../postgress/postgres.js";

// Bu funksiyada barcha buyurtmalarni olishni amalga oshiramiz
export async function getCategoryById(req, res) {
  const { categoryId } = req.params;
  console.log(req.params);

  // postmandan kelgan sorovlarni databazaga yuboriladi
  const foundedCategory = await fetchData(
    "SELECT * FROM category WHERE id = $1",
    categoryId
  );

  // muvoffaqiyatli bajarilsa chiqadigan natija
  res.status(200).send({
    message: "success",
    // databazadan olingan malumotni ekranga chop etish
    data: foundedCategory,
  });
}

// categoriyadagi barcha malumotlarni oluvchi funksiya
export async function getCategory(req, res) {
  // databazaga sorov yuborish
  const foundedCategory = await fetchData("SELECT * FROM category");

  // muvoffaqiyatli bajarilsa chiqadigan natija
  res.status(200).send({
    message: "success",
    // databazadan olingan malumotni ekranga chop etish
    data: foundedCategory,
  });
}

// Bu funksiyada yangi buyurtma yaratishni amalga oshiramiz
export async function createCategory(req, res) {
  const { name, image_url, category_id } = req.body;

  const createdCategory = await fetchData(
    "INSERT INTO category (name, image_url, category_id, description) VALUES ($1, $2, $3, $4) RETURNING *",
    name,
    image_url,
    category_id || null,
    description
  );

  res.status(201).send({
    message: "successfully created",
    data: createdCategory,
  });
}

export async function updateCategory(req, res) {
  const { name, image_url, category_id, description } = req.body;
  const id = req.params;

  const updatedCategory = await fetchData(
    `UPDATE category SET name = name,
      image_url = $2, category_id = category_id
      WHERE id = $4 RETURNING *`,
    name,
    image_url,
    category_id,
    description,
    id
  );

  res.status(201).send({
    message: "successfully updated",
    data: updatedCategory,
  });
}

export async function deleteCategory(req, res) {
  const { categoryId } = req.params;

  const foundedCategory = await fetchData(
    "SELECT * FROM category WHERE id = $1",
    categoryId
  );

  if (!foundedCategory.length) {
    res.status(404).send({
      message: "Category not found",
    });
    return;
  }

  if (foundedCategory[0]?.image_url) {
    fs.unlink(
      path.join(process.cwd(), "uploads", foundedCategory[0]?.image_url),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await fetchData("DELETE FROM category WHERE id = $1", categoryId);

  res.status(204).send();
}
