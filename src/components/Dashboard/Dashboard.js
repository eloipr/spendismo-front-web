import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Summary from "./../Summary/Summary";
import Expense from "./../Expense/Expense";
import Modal from "./../Modal/Modal";
import NewExpenseForm from "./../NewExpenseForm/NewExpenseForm";
import { getExpenses, createExpense } from "./../../services/expenses";
import "./Dashboard.scss";

const Dashboard = () => {
    const [expenses, setExpenses] = useState({});
    const [showAddExpense, setShowAddExpense] = useState(false);

    useEffect(() => {
        updateExpenses();
    }, []);

    const showAddExpenseModal = () => {
        setShowAddExpense(true);
    };

    const hideAddExpense = () => {
        setShowAddExpense(false);
    };

    const addExpense = expense => {
        createExpense(expense).subscribe(res => {
            updateExpenses();
            hideAddExpense();
        });
    };

    const updateExpenses = () => {
        getExpenses().subscribe(expenses => {
            setExpenses(expenses);
        });
    };

    const toComponent = expenses => {
        return Object.keys(expenses).map(key => <Expense key={key} expense={expenses[key]}></Expense>);
    };

    const expensesToArray = expenses => {
        return Object.keys(expenses).map(key => expenses[key]);
    };

    return (
        <div className="dashboard">
            <Summary expenses={expensesToArray(expenses)}></Summary>
            {toComponent(expenses)}
            <div className="expense add-button" onClick={showAddExpenseModal} data-testid="new-expense-button">
                <AddIcon fontSize="large" className="icon"></AddIcon>
            </div>
            <Modal show={showAddExpense} handleAccept={addExpense} handleClose={hideAddExpense}>
                <NewExpenseForm handleSubmit={addExpense}></NewExpenseForm>
            </Modal>
        </div>
    );
};

export default Dashboard;
