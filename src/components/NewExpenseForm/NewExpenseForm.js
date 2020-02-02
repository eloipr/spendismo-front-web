import React, { Component } from "react";
import "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./NewExpenseForm.scss";

class NewExpenseForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", amount: "", date: Date.now() };
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    };

    handleDateChange = date => {
        this.setState({ date });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState({ name: "", amount: "", date: Date.now() });
    };

    render() {
        const { name, amount, date } = this.state;

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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableToolbar
                        autoOk
                        initialFocusedDate={Date.now()}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={date}
                        onChange={this.handleDateChange}
                    />
                </MuiPickersUtilsProvider>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default NewExpenseForm;
