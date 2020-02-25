import React from "react";
import PropTypes from "prop-types";

const Summary = ({ expenses }) => {
    const getBalance = () => {
        return expenses.reduce((acc, expense) => acc + (expense.isIncome ? -expense.amount : expense.amount), 0);
    };

    const getTotalExpenses = () => {
        return expenses.length;
    };

    return (
        <div>
            <div>{getTotalExpenses()}</div>
            <div>{getBalance()}</div>
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
