-- CATEGORY table

CREATE TABLE category(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    image_url VARCHAR(255)
);


INSERT INTO category(id, name, image_url) VALUES
    (1, 'Rumayso', 'img1.jpeg')
    (2, 'Mursalina', 'img2.jpeg')
    (3, 'Reyha', 'img3.jpeg'),
    (4, 'Samiya', 'img4.jpeg'),
    (5, 'Rimaz', 'img15jpeg'),
    (6, 'Mustafo', 'img6.jpeg'),
    (7, 'Nurmuhammad', 'img7.jpeg'),
    (8, 'Firdavs', 'img8.jpeg'),
    (9, 'Muhammad', 'img9.jpeg'),
    (10, 'Ahmadiy', 'img10.jpeg');

-- PRODUCT table 

CREATE TABLE product(
    id INT SERIAL PRIMARY KEY, 
    brend VARCHAR(255) NOT NULL, 
    price BIGINT NOT NULL, 
    stock_quentity INTEGER NOT NULL, 
    description VARCHAR(255), 
    image_url VARCHAR(255), 
    category_id INTEGER, 
    FOREIGN KEY (category_id) REFERENCES category(id)
);


INSERT INTO product(brend, price, stock_quantity, description, image_url, category_id) VALUES
    ('Brend1', 10000, 50, 'Description1', 'product1.jpeg', 1),
    ('Brend2', 20000, 40, 'Description2', 'product2.jpeg', 2),
    ('Brend3', 30000, 30, 'Description3', 'product3.jpeg', 3),
    ('Brend4', 40000, 20, 'Description4', 'product4.jpeg', 4),
    ('Brend5', 50000, 10, 'Description5', 'product5.jpeg', 5),
    ('Brend6', 60000, 60, 'Description6', 'product6.jpeg', 6),
    ('Brend7', 70000, 70, 'Description7', 'product7.jpeg', 7),
    ('Brend8', 80000, 80, 'Description8', 'product8.jpeg', 8),
    ('Brend9', 90000, 90, 'Description9', 'product9.jpeg', 9),
    ('Brend10', 100000, 100, 'Description10', 'product10.jpeg', 10);

--ORDER table 

CREATE TABLE "order"(
    id SERIAL PRIMARY KEY, 
    product_id INTEGER, 
    order_date DATE, 
    address VARCHAR(255), 
    ship_via VARCHAR(255), 
    user_id INTEGER,
    FOREIGN KEY(product_id) REFERENCES product(id),
    FOREIGN KEY(user_id) REFERENCES usr(id)
);

INSERT INTO "order"(product_id, order_date, address, ship_via, user_id) VALUES
    (1, '2023-01-01', 'Address1', 'ShipVia1', 1),
    (2, '2023-02-01', 'Address2', 'ShipVia2', 2),
    (3, '2023-03-01', 'Address3', 'ShipVia3', 3),
    (4, '2023-04-01', 'Address4', 'ShipVia4', 4),
    (5, '2023-05-01', 'Address5', 'ShipVia5', 5),
    (6, '2023-06-01', 'Address6', 'ShipVia6', 6),
    (7, '2023-07-01', 'Address7', 'ShipVia7', 7),
    (8, '2023-08-01', 'Address8', 'ShipVia8', 8),
    (9, '2023-09-01', 'Address9', 'ShipVia9', 9),
    (10, '2023-10-01', 'Address10', 'ShipVia10', 10);

-- ORDER ITEMS 

CREATE TABLE order_items(
    id SERIAL PRIMARY KEY, 
    product_id INTEGER,
    quantity INTEGER,   
    price INTEGER,
    orders_id INTEGER,
    FOREIGN KEY(product_id) REFERENCES product(id),
    FOREIGN KEY(orders_id) REFERENCES "order"(id)
);

INSERT INTO order_items(product_id, quantity, price, orders_id) VALUES
    (1, 2, 20000, 1),
    (2, 3, 60000, 2),
    (3, 1, 30000, 3),
    (4, 5, 200000, 4),
    (5, 4, 200000, 5),
    (6, 2, 120000, 6),
    (7, 3, 210000, 7),
    (8, 1, 80000, 8),
    (9, 2, 180000, 9),
    (10, 1, 100000, 10);



-- USER table 

CREATE TABLE user(
    id  SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    phone VARCHAR(15) NOT NULL, 
    email VARCHAR(255), 
    address VARCHAR(255), 
    category_id INTEGER, 
    FOREIGN KEY(category_id) REFERENCES category(id)
);

INSERT INTO user(name, phone, email, address, category_id) VALUES
    ('User1', '1234567890', 'user1@example.com', 'Address1', 1),
    ('User2', '1234567891', 'user2@example.com', 'Address2', 2),
    ('User3', '1234567892', 'user3@example.com', 'Address3', 3),
    ('User4', '1234567893', 'user4@example.com', 'Address4', 4),
    ('User5', '1234567894', 'user5@example.com', 'Address5', 5),
    ('User6', '1234567895', 'user6@example.com', 'Address6', 6),
    ('User7', '1234567896', 'user7@example.com', 'Address7', 7),
    ('User8', '1234567897', 'user8@example.com', 'Address8', 8),
    ('User9', '1234567898', 'user9@example.com', 'Address9', 9),
    ('User10', '1234567899', 'user10@example.com', 'Address10', 10);


-- CONTRACT table 

CREATE TABLE contract(
    id SERIAL PRIMARY KEY,
    contract_date DATE NOT NULL, 
    customer_id INTEGER,
    total_amount INTEGER,
    contract_turi INTEGER,
    FOREIGN KEY (customer_id) REFERENCES user(id),
    FOREIGN KEY(payment_paid) REFERENCES payments(id)
);

INSERT INTO contract(contract_date, customer_id, total_amount) VALUES
    ('2023-01-01', 1, 100000),
    ('2023-02-01', 2, 200000),
    ('2023-03-01', 3, 300000),
    ('2023-04-01', 4, 400000),
    ('2023-05-01', 5, 500000),
    ('2023-06-01', 6, 600000),
    ('2023-07-01', 7, 700000),
    ('2023-08-01', 8, 800000),
    ('2023-09-01', 9, 900000),
    ('2023-10-01', 10, 1000000);


--PAYMENTS table

CREATE TABLE payments(
    id SERIAL PRIMARY KEY, 
    payment_date DATE NOT NULL,
    amount_paid INTEGER NOT NULL,
    payment_status VARCHAR(255),
    contract_id INTEGER, 
    FOREIGN KEY(contract_id) REFERENCES contract(id)
);

INSERT INTO payments(payment_date, amount_paid, payment_status, contract_id) VALUES
    ('2023-01-15', 10000, 'Paid', 1),
    ('2023-02-15', 20000, 'Paid', 2),
    ('2023-03-15', 30000, 'Paid', 3),
    ('2023-04-15', 40000, 'Paid', 4),
    ('2023-05-15', 50000, 'Paid', 5),
    ('2023-06-15', 60000, 'Paid', 6),
    ('2023-07-15', 70000, 'Paid', 7),
    ('2023-08-15', 80000, 'Paid', 8),
    ('2023-09-15', 90000, 'Paid', 9),
    ('2023-10-15', 100000, 'Paid', 10);
