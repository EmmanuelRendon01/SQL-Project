import * as customersModel from '../models/customersModel.js';

export const getCustomerByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const customer = await customersModel.findByEmail(email);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get customer' })
    }
};