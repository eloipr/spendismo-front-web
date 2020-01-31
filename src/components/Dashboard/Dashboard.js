import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Expense from "../Expense/Expense";
import "./Dashboard.scss";

const Dashboard = ({ expenses, handleAddExpense }) => {
    const toComponent = expenses => {
        return Object.keys(expenses).map(key => <Expense key={key} expense={expenses[key]}></Expense>);
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
