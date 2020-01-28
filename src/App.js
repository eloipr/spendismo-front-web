import React, { Component } from "react";
import "./App.scss";
import Dashboard from "./Dashboard";
import Modal from "./Modal";
import NewExpenseForm from "./NewExpenseForm";

const url = "http://localhost:8080/expenses";

class App extends Component {
    constructor() {
        super();
        this.state = {
            expenses: [],
            showAddExpense: false
        };
    }

    componentDidMount() {
        this.getExpenses();
    }

    getExpenses = () => {
        fetch(url)
            .then(res => res.json())
            .then(expenses => {
                this.setState({ expenses });
            });
    };

    showAddExpense = () => {
        this.setState({ showAddExpense: true });
    };

    hideAddExpense = () => {
        this.setState({ showAddExpense: false });
    };

    addExpense = expense => {
        fetch(url, {
            method: "post",
            body: JSON.stringify(expense),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
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
