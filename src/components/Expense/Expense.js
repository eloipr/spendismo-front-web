import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Expense.scss";

const Expense = ({ expense, handleDelete }) => {
    return (
        <div className="expense-container">
            <div className="expense">
                <div className="expense-name">{expense.name}</div>

                <div className="expense-date">
                    {new Intl.DateTimeFormat("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" }).format(
                        new Date(expense.date)
                    )}
                </div>
                <div className={`expense-amount ${expense.isIncome ? "positive-amount" : "negative-amount"}`}>
                    {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(expense.amount)}
                </div>
            </div>
            <DeleteIcon className="delete-icon" onClick={() => handleDelete(expense._id)}></DeleteIcon>
        </div>
    );
};

Expense.propTypes = {
    expense: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        isIncome: PropTypes.bool.isRequired
    }).isRequired
};

export default React.memo(Expense);
