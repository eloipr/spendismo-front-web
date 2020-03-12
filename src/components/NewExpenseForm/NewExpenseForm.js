import React, { useState } from "react";
import PropTypes from "prop-types";
import "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import "./NewExpenseForm.scss";

const NewExpenseForm = ({ handleSubmit }) => {
    const [input, setInput] = useState({ name: "", amount: "" });
    const [isIncome, setIsIncome] = useState(false);
    const [date, setDate] = useState(Date.now());

    const handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setInput({ ...input, [name]: value });
    };

    const handleIsIncomeChange = event => {
        setIsIncome(event.target.checked);
    };

    const handleDateChange = date => {
        setDate(date);
    };

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit({ ...input, date, isIncome });
        resetForm();
    };

    const resetForm = () => {
        setInput({ name: "", amount: "" });
        setIsIncome(false);
        setDate(Date.now());
    };

    const { name, amount } = input;

    return (
        <form className="new-expense-form" onSubmit={onSubmit}>
            <h1>New Expense</h1>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={name} onChange={handleInputChange} required />
            <Switch name="isIncome" checked={isIncome} value={"isIncome"} onChange={handleIsIncomeChange}></Switch>
            <label htmlFor="amount">Amount</label>
            <input
                id="amount"
                name="amount"
                type="text"
                pattern="[0-9]*"
                value={amount}
                onChange={handleInputChange}
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
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            <input type="submit" value="Submit" />
        </form>
    );
};

NewExpenseForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default NewExpenseForm;
