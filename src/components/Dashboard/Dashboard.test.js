import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { of } from "rxjs";
import Dashbaord from "./Dashboard";

const mockExpenses = {
    "5e491286aa2f9f4b3882aed2": {
        _id: "5e491286aa2f9f4b3882aed2",
        name: "gym",
        amount: 40,
        date: "2020-02-16T09:59:26.868Z",
        __v: 0
    },
    "5e4916340d21a532406c5b6d": {
        _id: "5e4916340d21a532406c5b6d",
        name: "ramen",
        amount: 16,
        date: "2020-02-14T10:15:00.000Z",
        __v: 0
    },
    "5e49162b0d21a532406c5b6c": {
        _id: "5e49162b0d21a532406c5b6c",
        name: "sopar",
        amount: 20,
        date: "2020-02-08T10:14:00.000Z",
        __v: 0
    }
};

jest.doMock("./../../services/expenses", () => ({
    getExpenses: jest.fn(() => of(mockExpenses)),
    createExpense: jest.fn(),
    getExpensesByMonth: jest.fn()
}));

jest.doMock("./../Summary/Summary", () => () => "Summary");

afterEach(cleanup);

test("test", () => {
    render(<Dashbaord></Dashbaord>);
    const button = screen.getByTestId("new-expense-button");
    userEvent.click(button);
});
