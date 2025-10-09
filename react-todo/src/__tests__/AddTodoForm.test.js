import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodoForm from "../components/AddTodoForm";

describe("AddTodoForm Component", () => {
  test("renders form elements correctly", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    expect(
      screen.getByPlaceholderText("Add a new todo...")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  test("calls onAddTodo with correct text when form is submitted", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const submitButton = screen.getByText("Add Todo");

    await user.type(input, "Test Todo");
    await user.click(submitButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("Test Todo");
    expect(input).toHaveValue("");
  });

  test("does not call onAddTodo when input is empty", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const submitButton = screen.getByText("Add Todo");

    await user.click(submitButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test("trims whitespace from input", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const submitButton = screen.getByText("Add Todo");

    await user.type(input, "  Test Todo  ");
    await user.click(submitButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("  Test Todo  ");
  });
});
