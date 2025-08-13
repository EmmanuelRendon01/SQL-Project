import pool from "../../config/db.js";

// import pool to do queries

// A function that send as a response a query about get all the bills.

export const findAll = async () => {
    const result = await pool.query(`
        SELECT b.id, b.billing_period, b.amount_billed, b.amount_paid, c.name as customer_name, c.email
        FROM bills b
        JOIN customers c on c.id = b.id_customer;`);
    return result.rows;
}

// A function that send as a response a query about get a bill by his id.

export const findById = async (id) => {
    const result = await pool.query(`
        SELECT b.id, b.billing_period, b.amount_billed, b.amount_paid, c.name as customer_name, c.email, b.id_customer
        FROM bills b
        JOIN customers c on c.id = b.id_customer
        where b.id = $1;`,
        [id]);
    return result.rows[0];
}

// A function that send as a response a query about create a bill.

export const createBill = async (id, billing_period, amount_billed, amount_paid, id_customer) => {
    const result = await pool.query(`INSERT INTO bills (id, billing_period, amount_billed, amount_paid, id_customer) 
        VALUES ($1, $2, $3 ,$4 ,$5) RETURNING *`,
    [id, billing_period, amount_billed, amount_paid, id_customer]);
    return result.rows[0];
}

// A function that send as a response a query about update a bill.

export const updateBill = async (id, billing_period, amount_billed, amount_paid, id_customer) => {
    const result = await pool.query(
        `UPDATE bills
        SET billing_period = $2, amount_billed = $3, amount_paid = $4, id_customer = $5
        WHERE id = $1 RETURNING *`,
        [id, billing_period, amount_billed, amount_paid, id_customer]
    );
    return result.rows[0];
}

// A function that send as a response a query about delete a bill.

export const deleteBill = async (id) => {
    const result = await pool.query(
        `DELETE FROM bills WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}

export const advancedQueries1 = async () => {
    const result = await pool.query(`
        select c.name, t.transaction_amount
        from transactions t
        join bills b on t.id_bill = b.id
        join customers c on b.id_customer = c.id 
        where t.transaction_status = 'Completed'
        order by t.transaction_amount DESC;`);
    return result.rows;
}

export const advancedQueries2 = async () => {
    const result = await pool.query(`
        select b.id, t.id, c.name as customer_name, b.billing_period, b.amount_billed, b.amount_paid, t.transaction_date , t.transaction_amount, t.transaction_status
        from bills b 
        join customers c on c.id = b.id_customer
        join transactions t on t.id_bill = b.id
        where b.amount_billed != b.amount_paid
        order by b.billing_period;`);
    return result.rows;
}

export const advancedQueries3 = async () => {
    const result = await pool.query(`
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
	where t.platform_used = 'Daviplata';`);
    return result.rows;
}

export const advancedQueries4 = async () => {
    const result = await pool.query(`
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
	where t.platform_used = 'Nequi';`);
    return result.rows;
}

