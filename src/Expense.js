import React from "react";

const Expense = ({ expense }) => {
    return (
        <div>
            {expense.name} - {expense.amount}
        </div>
    );
};

export default Expense;
