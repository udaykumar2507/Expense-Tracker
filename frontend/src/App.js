import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import AddExpensePage from "./pages/AddExpensesPage";
import ViewExpensesPage from "./pages/ViewExpensesPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    let isMounted = true; 

    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/expenses", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
        });

        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) { // Only update state if the component is still mounted
          setExpenses(result);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchExpenses();

    return () => {
      isMounted = false; // Cleanup flag when the component unmounts
    };
  }, []);

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
      toast.success("Expense deleted successfully!"); // Add toast notification
    } catch (err) {
      console.error("Error deleting expense:", err);
      toast.error("Failed to delete expense. Please try again."); // Add error toast notification
    }
  };

  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/add-expense"
              element={<AddExpensePage setExpenses={setExpenses} />}
            />
            <Route
              path="/view-expenses"
              element={
                <ViewExpensesPage
                  expenses={expenses}
                  deleteExpense={deleteExpense}
                />
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
