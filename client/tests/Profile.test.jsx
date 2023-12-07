import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("Profile Component Tests", () => {
  const mockUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    picture: "http://example.com/picture.jpg",
    sub: "auth0|123456",
    email_verified: true,
  };

  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: mockUser,
    });
  });

  test("displays user information correctly", () => {
    render(<Profile />);

    expect(screen.getByText(`Name: ${mockUser.name}`)).toBeInTheDocument();

    expect(screen.getByText(`📧 Email: ${mockUser.email}`)).toBeInTheDocument();

    const image = screen.getByAltText("profile avatar");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockUser.picture);

    expect(screen.getByText(`🔑 Auth0Id: ${mockUser.sub}`)).toBeInTheDocument();

    expect(
      screen.getByText(
        `✅ Email verified: ${mockUser.email_verified.toString()}`
      )
    ).toBeInTheDocument();
  });
});
