import * as billsModel from '../models/billsModel.js';

// Import functions of billsModel

// A function that receives the value sent by the function billsModel.findAll() and send that as a json to an endpoint
export const getAllBills = async (req, res) => {
    try {
        const bills = await billsModel.findAll();
        res.json(bills);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get bills' })
    }
};

// A function that receives the value sent by the function billsModel.findById(id) and send that as a json an endpoint

export const getBillById = async (req, res) => {
    try {
        const id = req.params.id;
        const bill = await billsModel.findById(id);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.json(bill);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get bill' })
    }
};

// A function that receives the value sent by the function billsModel.createBill and checks that the values that receives are correct and send that 
// as a json an endpoint

export const createBill = async (req, res) => {
    try {
        let { id, billing_period, amount_billed, amount_paid, id_customer } = req.body;

        // Parse to float or int
        amount_billed = parseFloat(amount_billed, 10);
        amount_paid = parseFloat(amount_paid, 10);
        id_customer = parseInt(id_customer, 10);

        // Validations about if the values there, are numbers.
        if (isNaN(amount_billed) || isNaN(amount_paid) || isNaN(id_customer)) {
            return res.status(400).json({ error: "There is a wrong value" });
        }

        const newBill = await billsModel.createBill(id, billing_period, amount_billed, amount_paid, id_customer);

        res.status(201).json(newBill);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ error: "Error to create bill" });
    }
};

// A function that receives the value sent by the function billsModel.updateBill and checks that the values that receives are correct and send that 
// as a json an endpoint

export const updateBill = async (req, res) => {
    try {
        let { id, billing_period, amount_billed, amount_paid, id_customer } = req.body;

        // Parse to float or int
        amount_billed = parseFloat(amount_billed, 10);
        amount_paid = parseFloat(amount_paid, 10);
        id_customer = parseInt(id_customer, 10);

        // Validations about if the values there, are numbers.
        if (isNaN(amount_billed) || isNaN(amount_paid) || isNaN(id_customer)) {
            return res.status(400).json({ error: "There is a wrong value" });
        }

        const updatedBill = await billsModel.updateBill(id, billing_period, amount_billed, amount_paid, id_customer);

        res.status(200).json(updatedBill);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to update bill' })
    }
};

// A function that receives the value sent by the function billsModel.deleteBill(id) and send that as a json an endpoint

export const deleteBill = async (req, res) => {
    try {
        const id = req.params.id;
        const bill = await billsModel.deleteBill(id);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to delete bill' })
    }
};

export const getAdvancedQueries1 = async (req, res) => {
    try {
        const bills = await billsModel.advancedQueries1();
        res.json(bills);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get bills' })
    }
};

export const getAdvancedQueries2 = async (req, res) => {
    try {
        const bills = await billsModel.advancedQueries2();
        res.json(bills);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get bills' })
    }
};

export const getAdvancedQueries3 = async (req, res) => {
    try {
        const bills = await billsModel.advancedQueries3();
        res.json(bills);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get bills' })
    }
};

export const getAdvancedQueries4 = async (req, res) => {
    try {
        const bills = await billsModel.advancedQueries4();
        res.json(bills);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get bills' })
    }
};