import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

test("Link to homepage is rendered", () => {
    render(<ErrorPage />);

    const linkElement = screen.getByRole("link", { name: /return to startpage/i });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
});
