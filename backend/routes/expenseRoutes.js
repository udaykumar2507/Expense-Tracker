const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const mongoose = require('mongoose');


// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new expense
router.post('/', async (req, res) => {
    const { description, amount, category } = req.body;
    const newExpense = new Expense({ description, amount, category });
    
    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
