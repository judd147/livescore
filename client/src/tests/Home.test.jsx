import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./components/Home";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Home Component Tests", () => {
  const mockLoginWithRedirect = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect,
    });
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("displays Login button when not authenticated", () => {
    render(<Home />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("Login button triggers loginWithRedirect", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Login"));
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });

  test("Signup button triggers loginWithRedirect with correct parameters", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Sign Up"));
    expect(mockLoginWithRedirect).toHaveBeenCalledWith({
      screen_hint: "signup",
    });
  });
});
