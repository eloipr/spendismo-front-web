import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Summary from "./../Summary/Summary";
import Expense from "./../Expense/Expense";
import Modal from "./../Modal/Modal";
import NewExpenseForm from "./../NewExpenseForm/NewExpenseForm";
import { getExpenses, createExpense, deleteExpense } from "./../../services/expenses";
import { objectToArray } from "./../../services/utils";
import "./Dashboard.scss";

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const Dashboard = () => {
    const [expenses, setExpenses] = useState({});
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [summaryFilter, setSummaryFilter] = useState("month");

    useEffect(() => {
        updateExpenses();
    }, []);

    const showAddExpenseModal = () => {
        setShowAddExpense(true);
    };

    const hideAddExpense = () => {
        setShowAddExpense(false);
    };

    const addExpense = expenseData => {
        createExpense(expenseData).subscribe(expense => {
            updateExpenses();
            hideAddExpense();
        });
    };

    const removeExpense = expenseId => {
        deleteExpense(expenseId).subscribe(expense => {
            updateExpenses();
        });
    };

    const updateExpenses = () => {
        getExpenses().subscribe(expenses => {
            setExpenses(expenses);
        });
    };

    const toComponent = expensesArr => {
        return expensesArr.map(expense => (
            <Expense key={expense._id} expense={expense} handleDelete={removeExpense}></Expense>
        ));
    };

    const monthFilter = expense => new Date().getMonth() === new Date(expense.date).getMonth();

    const todayFilter = expense => datesAreOnSameDay(new Date(), new Date(expense.date));

    const filterExpenses = expensesObj => {
        let expensesArr = objectToArray(expensesObj);
        return summaryFilter === "month"
            ? expensesArr.filter(monthFilter)
            : summaryFilter === "today"
            ? expensesArr.filter(todayFilter)
            : expensesArr;
    };

    const handleSummaryFilter = value => {
        setSummaryFilter(value);
    };

    return (
        <div className="dashboard">
            <select defaultValue={summaryFilter} onChange={event => handleSummaryFilter(event.target.value)}>
                <option value="total">Total</option>
                <option value="month">Current month</option>
                <option value="today">Today</option>
            </select>
            <Summary
                expenses={filterExpenses(expenses)}
                filter={summaryFilter}
                handleFilterChange={handleSummaryFilter}
            ></Summary>
            <div>
                {toComponent(filterExpenses(expenses))}
                <div className="expense add-button" onClick={showAddExpenseModal} data-testid="new-expense-button">
                    <AddIcon fontSize="large" className="add-icon"></AddIcon>
                </div>
            </div>
            <Modal show={showAddExpense} handleAccept={addExpense} handleClose={hideAddExpense}>
                <NewExpenseForm handleSubmit={addExpense}></NewExpenseForm>
            </Modal>
        </div>
    );
};

export default Dashboard;
