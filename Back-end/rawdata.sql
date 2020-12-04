CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255)NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number bigint NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
    UNIQUE (email)
);
//
CREATE TABLE admins(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
    UNIQUE (email_id)
);
//
CREATE TABLE products(
    product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    product_brand VARCHAR(255) NOT NULL,
    product_category VARCHAR(255) NOT NULL,
    product_description  TEXT NOT NULL,
    rating NUMERIC NOT NULL DEFAULT 0,
    number_of_reviews NUMERIC NOT NULL DEFAULT 0,
    product_price NUMERIC NOT NULL DEFAULT 0,
    count_in_stock NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
    -- FOREIGN KEY (product_id) REFERENCES reviews(review_id)
);

CREATE TABLE reviews(
    review_id  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_name VARCHAR(255) NOT NULL,
    rating NUMERIC NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE orderitems(
    items_id  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name VARCHAR(255) NOT NULL,
    item_image VARCHAR(255) NOT NULL,
    item_quantity NUMERIC NOT NULL DEFAULT 0,
    item_price NUMERIC NOT NULL DEFAULT 0,
    -- FOREIGN KEY (items_id) REFERENCES products(product_id)
);

CREATE TABLE orders(
    order_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_price NUMERIC NOT NULL,
    shipping_price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    paymentmethod VARCHAR(255) NOT NULL,
    is_paid BOOLEAN DEFAULT FALSE,
    paid_at TIMESTAMP,
    isdelivered BOOLEAN DEFAULT FALSE,
    delivered_at TIMESTAMP,
    -- FOREIGN KEY(order_id) REFERENCES orderitems(items_id),
    -- FOREIGN KEY(order_id) REFERENCES shippingaddress(address_id),
    -- FOREIGN KEY(order_id) REFERENCES paymentresult(payment_id),
    -- FOREIGN key(order_id) REFERENCES users(user_id)
);



CREATE TABLE payment_result(
    payment_id  VARCHAR(255) PRIMARY KEY ,
    status VARCHAR(255) NOT NULL,
    update_time TIMESTAMP
    amount real,
    token VARCHAR(255),
    user_id uuid DEFAULT uuid_generate_v4(),
    payment_type VARCHAR(255),
    payment_gateway VARCHAR(255) 
);


CREATE TABLE carts(
    cart_item_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    product_price NUMERIC NOT NULL DEFAULT 0,

);


SELECT carts.cart_item_id,products.product_name,products.product_image,products.product_price from carts RIGHT JOIN products ON carts.product_id=products.product_id