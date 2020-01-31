import React from "react";
import "./Expense.scss";

const Expense = ({ expense }) => {
    return (
        <div className="expense">
            <div className="expense-name">{expense.name}</div>

            <div className="expense-date">
                {new Intl.DateTimeFormat("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" }).format(
                    new Date(expense.date)
                )}
            </div>
            <div className="expense-amount">
                {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(expense.amount)}
            </div>
        </div>
    );
};

export default Expense;
