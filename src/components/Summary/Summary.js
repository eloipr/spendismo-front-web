import React from "react";
import PropTypes from "prop-types";
import "./Summary.scss";

const Summary = ({ expenses, handleFilterChange }) => {
    const balance = expenses.reduce((acc, expense) => acc + (expense.isIncome ? expense.amount : -expense.amount), 0);

    const totalExpenses = expenses.reduce((acc, expense) => acc + (expense.isIncome ? 0 : expense.amount), 0);

    const totalIncomes = expenses.reduce((acc, expense) => acc + (expense.isIncome ? expense.amount : 0), 0);

    return (
        <div>
            <select defaultValue="month" onChange={event => handleFilterChange(event.target.value)}>
                <option value="total">Total</option>
                <option value="month">Current month</option>
                <option value="today">Today</option>
            </select>
            <div className="summary-details">
                <div className="summary-row">
                    <span>Expenses: </span>
                    <span>
                        {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(totalExpenses)}
                    </span>
                </div>
                <div className="summary-row">
                    <span>Incomes: </span>
                    <span>
                        {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(totalIncomes)}
                    </span>
                </div>
                <div className="summary-row">
                    <span>Balance: </span>
                    <span className={balance > 0 ? "positive-amount" : balance < 0 ? "negative-amount" : ""}>
                        {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(balance)}
                    </span>
                </div>
            </div>
        </div>
    );
};

Summary.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            isIncome: PropTypes.bool.isRequired
        }).isRequired
    )
};

export default Summary;
