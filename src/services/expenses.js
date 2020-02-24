import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

const apiUrl = "http://localhost:4000/expenses";

export const getExpenses = () => {
    return ajax({ url: apiUrl, method: "GET", withCredentials: true }).pipe(
        map(res => {
            const expenses = res.response;
            return expenses.reduce((acc, current) => {
                acc[current._id] = current;
                return acc;
            }, {});
        })
    );
};

export const createExpense = expense => {
    return ajax({ url: apiUrl, method: "POST", body: expense, withCredentials: true }).pipe(map(res => res.response));
};
