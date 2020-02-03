import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";

const apiUrl = "http://localhost:4000/auth";

export const isAuthenticated = () => {
    return ajax({ url: `${apiUrl}/is-authenticated`, method: "GET", withCredentials: true }).pipe(
        map(res => res.response),
        catchError(error => of({ isAuthenticated: false }))
    );
};

export const logout = () => {
    return ajax({ url: `${apiUrl}/logout`, method: "POST", withCredentials: true }).pipe(map(res => res.response));
};
