import { Link } from "react-router-dom";
import './Navbar.css'

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <h1 className="logo">Expense Tracker</h1>
      </div>
      <div className="nav-right">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/add-expense" className="nav-link">Add Expense</Link></li>
          <li><Link to="/view-expenses" className="nav-link">View Expenses</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;