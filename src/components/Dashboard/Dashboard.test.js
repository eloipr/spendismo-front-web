import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { of } from "rxjs";
import Dashboard from "./Dashboard";
import * as expensesService from "./../../services/expenses";

jest.doMock("./../Summary/Summary", () => () => "Summary");

const mockInitialExpenses = {
    "5e491286aa2f9f4b3882aed2": {
        _id: "5e491286aa2f9f4b3882aed2",
        name: "gym",
        amount: 40,
        date: "2020-02-16T09:59:26.868Z",
        isIncome: false,
        __v: 0
    },
    "5e4916340d21a532406c5b6d": {
        _id: "5e4916340d21a532406c5b6d",
        name: "ramen",
        amount: 16,
        date: new Date().toISOString(),
        isIncome: false,
        __v: 0
    }
};

const mockAddedExpense = {
    "5e49162b0d21a532406c5b6c": {
        _id: "5e49162b0d21a532406c5b6c",
        name: "sopar",
        amount: 20,
        date: new Date().toISOString(),
        isIncome: true,
        __v: 0
    }
};

afterEach(cleanup);

beforeAll(() => {
    const mockCreateExpense = jest.spyOn(expensesService, "createExpense");
    mockCreateExpense.mockReturnValue(of(mockAddedExpense));

    const mockGetExpenses = jest.spyOn(expensesService, "getExpenses");
    mockGetExpenses.mockReturnValue(of(mockInitialExpenses));
});

describe("Dashboard", () => {
    it("should add a new expense", async () => {
        render(<Dashboard></Dashboard>);
        const addButton = await screen.findByTestId("new-expense-button");
        userEvent.click(addButton);
        const nameInput = screen.getByLabelText("Name");
        userEvent.type(nameInput, mockAddedExpense["5e49162b0d21a532406c5b6c"].name);
        const amountInput = screen.getByLabelText("Amount");
        userEvent.type(amountInput, mockAddedExpense["5e49162b0d21a532406c5b6c"].amount);
        const mockGetExpenses = jest.spyOn(expensesService, "getExpenses");
        mockGetExpenses.mockReturnValue(of({ ...mockInitialExpenses, ...mockAddedExpense }));
        const submitButton = screen.getByText("Submit");
        userEvent.click(submitButton);
        const newExpense = await screen.findByText("sopar");
        expect(newExpense).toBeInTheDocument();
    });

    it("should display all the expenses when the filter is total", () => {
        render(<Dashboard></Dashboard>);
        userEvent.selectOptions(screen.getByTestId("filter"), ["total"]);
        const gymExpense = screen.getByText("gym");
        const ramenExpense = screen.getByText("ramen");
        expect(gymExpense).toBeInTheDocument();
        expect(ramenExpense).toBeInTheDocument();
    });

    it("should only display the current month expenses", () => {
        render(<Dashboard></Dashboard>);
        userEvent.selectOptions(screen.getByTestId("filter"), ["month"]);
        const gymExpense = screen.queryByText("gym");
        const ramenExpense = screen.getByText("ramen");
        expect(gymExpense).toBeNull();
        expect(ramenExpense).toBeInTheDocument();
    });

    it("should only display the todays expenses", () => {
        render(<Dashboard></Dashboard>);
        userEvent.selectOptions(screen.getByTestId("filter"), ["today"]);
        const gymExpense = screen.queryByText("gym");
        const ramenExpense = screen.getByText("ramen");
        expect(gymExpense).toBeNull();
        expect(ramenExpense).toBeInTheDocument();
    });
});
