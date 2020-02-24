import React, { useState } from "react";
import "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./NewExpenseForm.scss";

const NewExpenseForm = ({ handleSubmit }) => {
    const [input, setInput] = useState({ name: "", amount: "" });
    const [date, setDate] = useState(Date.now());

    const handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setInput({ ...input, [name]: value });
    };

    const handleDateChange = date => {
        setDate(date);
    };

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit({ ...input, ...date });
        setInput({ name: "", amount: "" });
        setDate(Date.now());
    };

    const { name, amount } = input;

    return (
        <form className="new-expense-form" onSubmit={onSubmit}>
            <h1>New Expense</h1>
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" value={name} onChange={handleInputChange} required />
            <label htmlFor="amount">Amount:</label>
            <input name="amount" type="text" pattern="[0-9]*" value={amount} onChange={handleInputChange} required />
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
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default NewExpenseForm;
