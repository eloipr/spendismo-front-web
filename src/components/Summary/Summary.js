import React, { useEffect } from "react";
import { getExpensesByMonth } from "./../../services/expenses";

const Summary = () => {
    useEffect(() => {
        const month = new Date().getMonth() + 1;
        getExpensesByMonth(month).subscribe(expenses => {
            console.log(expenses);
        });
    }, []);
    return <div></div>;
};

export default Summary;
