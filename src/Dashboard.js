import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Expense from "./Expense";
import "./Dashboard.scss";

const Dashboard = ({ expenses, handleAddExpense }) => {
    const toComponent = expensesList => {
        return expensesList.map(expense => <Expense key={expense._id} expense={expense}></Expense>);
    };

    return (
        <div className="dashboard">
            {toComponent(expenses)}
            <div>
                <AddCircleOutlineIcon
                    fontSize="large"
                    className="add-button"
                    onClick={handleAddExpense}
                ></AddCircleOutlineIcon>
            </div>
        </div>
    );
};

export default Dashboard;
