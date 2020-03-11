import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { of } from "rxjs";
import * as authService from "./../../services/auth";
import App from "./App";

afterEach(cleanup);

describe("App", () => {
    describe("Authenticated", () => {
        beforeAll(() => {
            const mockIsAuthenticated = jest.spyOn(authService, "isAuthenticated");
            mockIsAuthenticated.mockReturnValue(of({ isAuthenticated: true }));
        });

        it("should go to the dashboard", () => {
            render(<App></App>);
            screen.getByText("Dashboard");
        });
    });

    describe("Not authenticated", () => {
        beforeAll(() => {
            const mockIsAuthenticated = jest.spyOn(authService, "isAuthenticated");
            mockIsAuthenticated.mockReturnValue(of({ isAuthenticated: false }));
        });

        it("should go to the sign in", () => {
            render(<App></App>);
            screen.getByText("Sign In");
        });
    });
});
