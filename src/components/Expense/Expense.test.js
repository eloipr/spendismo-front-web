import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Expense from "./Expense";

const mockExpense = {
    _id: "5e491286aa2f9f4b3882aed2",
    name: "gym",
    amount: 40,
    date: "2020-02-16T09:59:26.868Z",
    isIncome: false,
    __v: 0
};

afterEach(cleanup);

describe("Expense", () => {
    let handleDelete;
    beforeEach(() => {
        handleDelete = jest.fn();
        render(<Expense expense={mockExpense} handleDelete={handleDelete}></Expense>);
    });
    it("renders the correct name", () => {
        screen.getByText("gym");
    });
    it("renders the correct date", () => {
        screen.getByText("16/02/2020");
    });

    it("renders the correct amount", () => {
        screen.getByText("40,00 €");
    });

    it("deletes the expense", () => {
        const deleteButton = screen.getByTestId("delete-button");
        userEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalled();
    });
});
