import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  test("calls onAddTodo with correct text when form is submitted", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const submitButton = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(submitButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("Test Todo");
    expect(input).toHaveValue("");
  });

  test("does not call onAddTodo when input is empty", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const submitButton = screen.getByText("Add Todo");

    fireEvent.click(submitButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test("trims whitespace from input", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const submitButton = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "  Test Todo  " } });
    fireEvent.click(submitButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("  Test Todo  ");
  });
});