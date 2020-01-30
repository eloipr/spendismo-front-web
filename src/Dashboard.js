import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Expense from "./Expense";
import "./Dashboard.scss";

const Dashboard = ({ expenses, handleAddExpense }) => {
    const toComponent = expensesList => {
        return expensesList.map(expense => <Expense key={expense._id} expense={expense}></Expense>);
    };

    return (
        <div className="dashboard">
            {toComponent(expenses)}
            <div className="expense add-button" onClick={handleAddExpense}>
                <AddIcon fontSize="large" className="icon"></AddIcon>
            </div>
        </div>
    );
};

export default Dashboard;
