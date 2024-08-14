CREATE TABLE category (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    image_url VARCHAR(255),
    description VARCHAR(255)
);

INSERT INTO category (id, name, image_url, description) VALUES
(1, 'Electronics', 'images/electronics.jpg', 'Electronic gadgets and devices'),
(2, 'Furniture', 'images/furniture.jpg', 'Home and office furniture');



CREATE TABLE product (
    id BIGINT PRIMARY KEY,
    brand VARCHAR(255),
    price BIGINT,
    stock_quantity BIGINT,
    description VARCHAR(255),
    image_url VARCHAR(255),
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO product (id, brand, price, stock_quantity, description, image_url, category_id) VALUES
(1, 'Samsung', 1000, 50, 'Smartphone', 'images/samsung.jpg', 1),
(2, 'Ikea', 200, 100, 'Office Chair', 'images/chair.jpg', 2);



CREATE TABLE customer (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    phone BIGINT,
    email VARCHAR(255),
    address VARCHAR(255),
    category_id INT
);

INSERT INTO customer (id, name, phone, email, address, category_id) VALUES
(1, 'John Doe', 1234567890, 'john@example.com', '123 Main St', 1),
(2, 'Jane Smith', 2345678901, 'jane@example.com', '456 Elm St', 2);


CREATE TABLE "order" (
    id BIGINT PRIMARY KEY,
    product_id INT,
    order_date DATE,
    address VARCHAR(255),
    ship_via VARCHAR(255),
    customer_id INT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

INSERT INTO "order" (id, product_id, order_date, address, ship_via, customer_id) VALUES
(1, 1, '2024-08-14', '123 Main St', 'UPS', 1),
(2, 2, '2024-08-15', '456 Elm St', 'FedEx', 2);


CREATE TABLE "order_items" (
    id BIGINT PRIMARY KEY,
    product_id INT,
    quantity INT,
    price BIGINT,
    orders_id INT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (orders_id) REFERENCES "order"(id)
);

INSERT INTO "order_items" (id, product_id, quantity, price, orders_id) VALUES
(1, 1, 2, 1000, 1),
(2, 2, 1, 200, 2);


CREATE TABLE contract_type (
    id BIGINT PRIMARY KEY,
    duration INT,
    percentage INT
);

INSERT INTO contract_type (id, duration, percentage) VALUES
(1, 12, 5),
(2, 24, 10);


CREATE TABLE contract (
    id BIGINT PRIMARY KEY,
    contract_date DATE,
    customer_id INT,
    total_amount INT,
    monthly_payment INT,
    order_id INT,
    contract_type BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (order_id) REFERENCES "order"(id),
    FOREIGN KEY (contract_type) REFERENCES contract_type(id)
);

INSERT INTO contract (id, contract_date, customer_id, total_amount, monthlmonthly_paymentmonthly_paymenty_payment, order_id, contract_type) VALUES
(1, '2024-08-14', 1, 1200, 100, 1, 1),
(2, '2024-08-15', 2, 2400, 200, 2, 2);


CREATE TABLE payments (
    id BIGINT PRIMARY KEY,
    payment_date DATE,
    amount_paid INT,
    contract_id INT,
    FOREIGN KEY (contract_id) REFERENCES contract(id)
);

INSERT INTO payments (id, payment_date, amount_paid, contract_id) VALUES
(1, '2024-09-14', 100, 1),
(2, '2024-10-14', 100, 1),
(3, '2024-09-15', 200, 2),
(4, '2024-10-15', 200, 2);