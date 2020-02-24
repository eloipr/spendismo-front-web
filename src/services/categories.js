import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

const apiUrl = "http://localhost:4000/categories";

export const getCategories = () => {
    return ajax({ url: apiUrl, method: "GET", withCredentials: true }).pipe(
        map(res => {
            const categories = res.response;
            return categories.reduce((acc, current) => {
                acc[current._id] = current;
                return acc;
            }, {});
        })
    );
};

export const createCategory = category => {
    return ajax({ url: apiUrl, method: "POST", body: category, withCredentials: true }).pipe(map(res => res.response));
};
