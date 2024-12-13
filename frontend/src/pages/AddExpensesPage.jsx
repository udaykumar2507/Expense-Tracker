import React from "react";
import ExpenseForm from "../components/ExpenseForm";

const AddExpensePage = ({ setExpenses }) => {
  return (
    <div>
      <h2>Add Expense</h2>
      <ExpenseForm setExpenses={setExpenses} />
    </div>
  );
};

export default AddExpensePage;
