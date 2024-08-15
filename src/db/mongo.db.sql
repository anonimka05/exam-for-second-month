-- Categories Products

db.categories.insertOne({
    name: "Electronics",
    image_url: "images/electronics.jpg",
    description: "Electronic gadgets and devices"
});

db.categories.find().pretty();

db.categories.updateOne(
    { _id: ObjectId("64da1c1b45d8e4e2f3a8e61b") },
    { $set: { description: "Updated" } }
);

db.categories.deleteOne({ _id: ObjectId("64da1c1b45d8e4e2f3a8e61b") });

db.products.deleteOne({ _id: ObjectId("64da1c1b45d8e4e2f3a8e61d") });

db.products.insertOne({
    brand: "Samsung",
    price: 1000,
    stock_quantity: 50,
    description: "Smartphone",
    image_url: "images/samsung.jpg",
    category_id: ObjectId("64da1c1b45d8e4e2f3a8e61b")
});

db.products.find({ category_id: ObjectId("64da1c1b45d8e4e2f3a8e61b") }).pretty();

db.products.updateOne(
    { _id: ObjectId("64da1c1b45d8e4e2f3a8e61d") },
    { $set: { price: 1200 } }
);

db.products.deleteOne({ _id: ObjectId("64da1c1b45d8e4e2f3a8e61d") });

-- Customer va Order

db.customers.insertOne({
    name: "John Doe",
    phone: 1234567890,
    email: "john@example.com",
    address: "123 Main St",
    category_id: ObjectId("64da1c1b45d8e4e2f3a8e61b")
});

db.customers.find().pretty();

db.customers.find({ category_id: ObjectId("64da1c1b45d8e4e2f3a8e61b") }).pretty();

db.customers.updateOne(
    { _id: ObjectId("64da1c1b45d8e4e2f3a8e61f") },
    { $set: { address: "456 Updated St" } }
);

db.customers.deleteOne({ _id: ObjectId("64da1c1b45d8e4e2f3a8e61f") });

db.orders.insertOne({
    product_id: ObjectId("64da1c1b45d8e4e2f3a8e61d"),
    order_date: new Date("2024-08-14T00:00:00Z"),
    address: "123 Main St",
    ship_via: "UPS",
    customer_id: ObjectId("64da1c1b45d8e4e2f3a8e61f")
});

db.orders.find().pretty();

db.orders.find({ customer_id: ObjectId("64da1c1b45d8e4e2f3a8e61f") }).pretty();

db.orders.updateOne(
    { _id: ObjectId("64da1c1b45d8e4e2f3a8e621") },
    { $set: { address: "456 Updated St" } }
);

db.orders.deleteOne({ _id: ObjectId("64da1c1b45d8e4e2f3a8e621") });


