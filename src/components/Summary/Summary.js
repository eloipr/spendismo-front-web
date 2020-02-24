import React from "react";

const Summary = ({ monthExpenses }) => {
    const getTotalCost = () => {
        let total = 0;
        monthExpenses.forEach(expense => {
            total += expense.amount;
        });
        return total;
    };

    const getTotalExpenses = () => {
        return monthExpenses.length;
    };

    return (
        <div>
            <div>{getTotalExpenses()}</div>
            <div>{getTotalCost()}</div>
        </div>
    );
};

export default Summary;
