import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders TodoList component correctly", () => {
    render(<TodoList />);
    
    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add a new todo...")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("adds a new todo when form is submitted", () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText("Add a new todo...");
    const button = screen.getByText("Add Todo");
    
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);
    
    expect(screen.getByText("New Todo")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("toggles todo completion status when clicked", () => {
    render(<TodoList />);
    
    const todoText = screen.getByText("Learn React");
    
    expect(todoText).toHaveStyle("text-decoration: none");
    
    fireEvent.click(todoText);
    
    expect(todoText).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo when delete button is clicked", () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText("Delete");
    
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});