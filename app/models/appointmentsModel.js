import pool from "../../config/db.js";

export const findAll = async () => {
    const result = await pool.query(`
        SELECT c.id, c.fecha_cita, c.hora_cita, c.motivo, c.descripcion, u.nombre_ubicacion, m.nombre_metodo_pago,
        e.nombre_estado, p.nombre_paciente, me.nombre_medico
        FROM citas c
        JOIN ubicaciones u ON u.id = c.id_ubicacion
        JOIN metodos_pago m ON m.id = c.id_metodo_pago
        JOIN estados_cita e ON e.id = c.id_estado
        JOIN pacientes p ON p.id = c.id_paciente
        JOIN medicos me ON me.id = c.id_medico`);
    return result.rows;
}

export const findById = async (id) => {
    const result = await pool.query(`
        SELECT c.id, c.fecha_cita, c.hora_cita, c.motivo, c.descripcion, u.nombre_ubicacion, m.nombre_metodo_pago,
        e.nombre_estado, p.nombre_paciente, me.nombre_medico
        FROM citas c
        JOIN ubicaciones u ON u.id = c.id_ubicacion
        JOIN metodos_pago m ON m.id = c.id_metodo_pago
        JOIN estados_cita e ON e.id = c.id_estado
        JOIN pacientes p ON p.id = c.id_paciente
        JOIN medicos me ON me.id = c.id_medico
        WHERE c.id = $1`, [id]);
    return result.rows[0];
}

export const findByIdWithouthJoin = async (id) => {
    const result = await pool.query(`
        SELECT * FROM citas
        WHERE id = $1`, [id]);
    return result.rows[0];
}

export const findByUserId = async (id) => {
    const result = await pool.query(`
        SELECT c.id, c.fecha_cita, c.hora_cita, c.motivo, c.descripcion, u.nombre_ubicacion, m.nombre_metodo_pago,
        e.nombre_estado, p.nombre_paciente, me.nombre_medico
        FROM citas c
        JOIN ubicaciones u ON u.id = c.id_ubicacion
        JOIN metodos_pago m ON m.id = c.id_metodo_pago
        JOIN estados_cita e ON e.id = c.id_estado
        JOIN pacientes p ON p.id = c.id_paciente
        JOIN medicos me ON me.id = c.id_medico
        WHERE p.id = $1`, [id]);
    return result.rows;
}

export const createAppointment = async (fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente) => {
    const result = await pool.query(`INSERT INTO citas (fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente) 
        VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7 ,$8, $9) RETURNING *`,
    [fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente]);
    return result.rows[0];
}

export const updateAppointment = async (fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente, id) => {
    const result = await pool.query(
        `UPDATE citas
        SET fecha_cita = $1, hora_cita = $2, motivo = $3, descripcion = $4, id_ubicacion = $5, id_metodo_pago = $6, id_medico = $7, id_estado = $8, id_paciente = $9
        WHERE id = $10 RETURNING *`,
        [fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente, id]
    );
    return result.rows[0];
}

export const deleteAppointment = async (id) => {
    const result = await pool.query(
        `DELETE FROM citas WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}