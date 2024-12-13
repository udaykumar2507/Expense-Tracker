import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = ({ setExpenses }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const addExpense = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      toast.error('Please fill all the fields!');
      return;
    }

    const expense = {
      description,
      amount: Number(amount),
      category,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/expenses', expense);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      toast.success('Expense added successfully!');
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (err) {
      toast.error('Error adding expense!');
      console.error('Error:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
