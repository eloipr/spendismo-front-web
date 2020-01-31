import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

const apiUrl = "http://localhost:3000/expenses";

export const getExpenses = () => {
    return ajax.getJSON(apiUrl).pipe(
        map(expenses => {
            return expenses.reduce((acc, current) => {
                acc[current._id] = current;
                return acc;
            }, {});
        })
    );
};

export const addExpense = expense => {
    return ajax.post(apiUrl, expense);
};
