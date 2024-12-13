import React from "react";
import ExpenseList from "../components/ExpenseList";

const ViewExpensesPage = ({ expenses, deleteExpense }) => {
  return (
    <div>
      <h2>View Expenses</h2>
      {expenses.length > 0 ? (
        <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      ) : (
        <p>No expenses to display.</p>
      )}
    </div>
  );
};

export default ViewExpensesPage;
