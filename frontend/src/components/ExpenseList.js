import React from "react";
import { Table, Button } from "react-bootstrap"; // Importing bootstrap components for a table and button

const ExpenseList = ({ expenses, deleteExpense }) => {
  return (
    <div className="expense-list-container">
      <h3 className="expense-list-title">Your Expenses</h3>
      <Table striped bordered hover responsive className="expense-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense._id}>
              <td>{index + 1}</td>
              <td>{expense.description}</td>
              <td>Rs.{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    // Ensure correct ID is logged
                    console.log('Deleting expense with ID:', expense._id);
                    deleteExpense(expense._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseList;
