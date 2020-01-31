import React, { Component } from "react";
import "./App.scss";
import Dashboard from "../Dashboard/Dashboard";
import Modal from "../Modal/Modal";
import NewExpenseForm from "../NewExpenseForm/NewExpenseForm";
import { getExpenses, addExpense } from "../../services/expenses";

class App extends Component {
    constructor() {
        super();
        this.state = {
            expenses: {},
            showAddExpense: false
        };
    }

    componentDidMount() {
        this.getExpenses();
    }

    getExpenses() {
        getExpenses().subscribe(expenses => {
            this.setState({ expenses });
        });
    }

    showAddExpense = () => {
        this.setState({ showAddExpense: true });
    };

    hideAddExpense = () => {
        this.setState({ showAddExpense: false });
    };

    addExpense = expense => {
        addExpense(expense).subscribe(res => {
            this.getExpenses();
            this.hideAddExpense();
        });
    };

    render() {
        const { expenses, showAddExpense } = this.state;
        const newExpenseForm = <NewExpenseForm handleSubmit={this.addExpense}></NewExpenseForm>;
        return (
            <main>
                <Dashboard expenses={expenses} handleAddExpense={this.showAddExpense}></Dashboard>
                <Modal
                    show={showAddExpense}
                    handleAccept={this.addExpense}
                    handleClose={this.hideAddExpense}
                    content={newExpenseForm}
                ></Modal>
            </main>
        );
    }
}

export default App;
