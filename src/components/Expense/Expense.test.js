import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Expense from "./Expense";

const mockExpense = {
    _id: "5e491286aa2f9f4b3882aed2",
    name: "gym",
    amount: 40,
    date: "2020-02-16T09:59:26.868Z",
    __v: 0
};

afterEach(cleanup);

describe("Expense", () => {
    it("renders the correct name", () => {
        render(<Expense expense={mockExpense}></Expense>);
        screen.getByText("gym");
    });
    it("renders the correct date", () => {
        render(<Expense expense={mockExpense}></Expense>);
        screen.getByText("16/02/2020");
    });

    it("renders the correct amount", () => {
        render(<Expense expense={mockExpense}></Expense>);
        screen.getByText("40,00 €");
    });
});
