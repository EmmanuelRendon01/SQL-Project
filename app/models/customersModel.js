import pool from "../../config/db.js";

export const findByEmail = async (email) => {
    const result = await pool.query(`
        SELECT * FROM customers where email = $1`,
        [email]);
    return result.rows[0];
}
