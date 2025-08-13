CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    id_number VARCHAR(40) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    phone_number VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE bills (
    id VARCHAR(25) PRIMARY KEY,
    billing_period DATE NOT NULL,
    amount_billed NUMERIC(12,2) NOT NULL,
    amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
    id_customer INT,
    FOREIGN KEY (id_customer) REFERENCES customers(id) ON DELETE SET NULL,
    CHECK (amount_paid <= amount_billed)
);

CREATE TYPE transaction_status_enum AS ENUM ('Pending', 'Failed', 'Completed');
CREATE TYPE platform_used_enum AS ENUM ('Daviplata', 'Nequi');
CREATE TYPE transaction_type_enum AS ENUM ('Bill Payment');

CREATE TABLE transactions (
    id VARCHAR(25) PRIMARY KEY,
    transaction_date TIMESTAMP NOT NULL,
    transaction_amount NUMERIC(12,2) NOT NULL CHECK (transaction_amount > 0),
    transaction_status transaction_status_enum NOT NULL,
	transaction_type transaction_type_enum NOT NULL,
    platform_used platform_used_enum NOT NULL,
    id_bill VARCHAR(25),
    FOREIGN KEY (id_bill) REFERENCES bills(id) ON DELETE SET NULL
);

select c.name, t.transaction_amount
	from transactions t
	join bills b on t.id_bill = b.id
	join customers c on b.id_customer = c.id 
	where t.transaction_status = 'Completed'
	order by t.transaction_amount DESC;

select b.id, t.id, c.name as customer_name, b.billing_period, b.amount_billed, b.amount_paid, t.transaction_date , t.transaction_amount, t.transaction_status
	from bills b 
	join customers c on c.id = b.id_customer
	join transactions t on t.id_bill = b.id
	where b.amount_billed != b.amount_paid
	order by b.billing_period;

select t.id AS transaction_id,
       t.transaction_date,
       t.transaction_amount,
       t.transaction_status,
       t.platform_used,
       c.name AS customer_name,
       b.id AS bill_id,
       b.billing_period
	from transactions t 
	join bills b on b.id = t.id_bill
	join customers c on c.id = b.id_customer
	where t.platform_used = 'Daviplata';

select t.id AS transaction_id,
       t.transaction_date,
       t.transaction_amount,
       t.transaction_status,
       t.platform_used,
       c.name AS customer_name,
       b.id AS bill_id,
       b.billing_period
	from transactions t 
	join bills b on b.id = t.id_bill
	join customers c on c.id = b.id_customer
	where t.platform_used = 'Nequi';