import React, { Component } from "react";
import "./NewExpenseForm.scss";

class NewExpenseForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", amount: "", date: Date.now() };
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.validity.valid ? target.value : this.state[name];

        this.setState({ [name]: value });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    };

    render() {
        const { name, amount } = this.state;

        return (
            <form className="new-expense-form" onSubmit={this.onSubmit}>
                <h1>New Expense</h1>
                <label htmlFor="name">Name:</label>
                <input name="name" type="text" value={name} onChange={this.handleInputChange} required />
                <label htmlFor="amount">Amount:</label>
                <input
                    name="amount"
                    type="text"
                    pattern="[0-9]*"
                    value={amount}
                    onChange={this.handleInputChange}
                    required
                />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default NewExpenseForm;
