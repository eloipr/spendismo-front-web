import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Summary from "./../Summary/Summary";
import Expense from "./../Expense/Expense";
import Modal from "./../Modal/Modal";
import NewExpenseForm from "./../NewExpenseForm/NewExpenseForm";
import { getExpenses, createExpense } from "./../../services/expenses";
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
        return Object.keys(expenses).reduce((acc, key) => {
            const expense = expenses[key];
            switch (summaryFilter) {
                case "month": {
                    if (new Date().getMonth() === new Date(expense.date).getMonth()) {
                        acc.push(expense);
                    }
                    break;
                }
                case "today": {
                    if (datesAreOnSameDay(new Date(), new Date(expense.date))) {
                        acc.push(expense);
                    }
                    break;
                }
                default: {
                    acc.push(expense);
                }
            }
            return acc;
        }, []);
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
                expenses={expensesToArray(expenses)}
                filter={summaryFilter}
                handleFilterChange={handleSummaryFilter}
            ></Summary>
            <div>
                {toComponent(expenses)}
                <div className="expense add-button" onClick={showAddExpenseModal} data-testid="new-expense-button">
                    <AddIcon fontSize="large" className="icon"></AddIcon>
                </div>
            </div>
            <Modal show={showAddExpense} handleAccept={addExpense} handleClose={hideAddExpense}>
                <NewExpenseForm handleSubmit={addExpense}></NewExpenseForm>
            </Modal>
        </div>
    );
};

export default Dashboard;
