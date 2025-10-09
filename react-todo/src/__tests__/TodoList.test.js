import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // Write Initial Render Test: Verify that the TodoList component renders correctly
  test("renders TodoList component correctly", () => {
    render(<TodoList />);

    // Check if the title is rendered
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Check if the add todo form is rendered
    expect(
      screen.getByPlaceholderText("Add a new todo...")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();

    // Ensure that the initial state (a few demo todos) is rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("renders initial demo todos with correct states", () => {
    render(<TodoList />);

    // Check if "Write Tests" is marked as completed (should have line-through style)
    const completedTodo = screen.getByText("Write Tests");
    expect(completedTodo).toHaveStyle("text-decoration: line-through");

    // Check if other todos are not completed
    const incompleteTodo1 = screen.getByText("Learn React");
    const incompleteTodo2 = screen.getByText("Build a Todo App");
    expect(incompleteTodo1).toHaveStyle("text-decoration: none");
    expect(incompleteTodo2).toHaveStyle("text-decoration: none");
  });

  // Test Adding Todos: Use fireEvent to simulate user input and form submission
  test("adds a new todo when form is submitted", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");

    // Use fireEvent to simulate user input
    fireEvent.change(input, { target: { value: "New Test Todo" } });

    // Use fireEvent to simulate form submission
    fireEvent.click(addButton);

    // Check if the new todo is added
    expect(screen.getByText("New Test Todo")).toBeInTheDocument();

    // Check if input field is cleared
    expect(input).toHaveValue("");
  });

  test("does not add empty todos", () => {
    render(<TodoList />);

    const addButton = screen.getByText("Add Todo");
    const initialTodos = screen.getAllByText(/Delete/);
    const initialTodoCount = initialTodos.length;

    // Try to submit empty form using fireEvent
    fireEvent.click(addButton);

    // Check that no new todo was added
    const afterTodos = screen.getAllByText(/Delete/);
    expect(afterTodos).toHaveLength(initialTodoCount);
  });

  test("does not add todos with only whitespace", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");
    const initialTodos = screen.getAllByText(/Delete/);
    const initialTodoCount = initialTodos.length;

    // Type only whitespace using fireEvent
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    // Check that no new todo was added
    const afterTodos = screen.getAllByText(/Delete/);
    expect(afterTodos).toHaveLength(initialTodoCount);
  });

  // Test Toggling Todos: Write a test to verify that a todo item can be toggled between completed and not completed
  test("toggles todo completion status when clicked", () => {
    render(<TodoList />);

    const todoText = screen.getByText("Learn React");

    // Initially should not be completed
    expect(todoText).toHaveStyle("text-decoration: none");

    // Use fireEvent to click and toggle completion
    fireEvent.click(todoText);

    // Should now be completed
    expect(todoText).toHaveStyle("text-decoration: line-through");

    // Click again to toggle back using fireEvent
    fireEvent.click(todoText);

    // Should be back to incomplete
    expect(todoText).toHaveStyle("text-decoration: none");
  });

  test("toggles already completed todo back to incomplete", () => {
    render(<TodoList />);

    const completedTodo = screen.getByText("Write Tests");

    // Initially should be completed
    expect(completedTodo).toHaveStyle("text-decoration: line-through");

    // Use fireEvent to click and toggle
    fireEvent.click(completedTodo);

    // Should now be incomplete
    expect(completedTodo).toHaveStyle("text-decoration: none");
  });

  // Test Deleting Todos: Write a test to verify that a todo item can be deleted
  test("deletes a todo when delete button is clicked", () => {
    render(<TodoList />);

    // Find the todo and its delete button
    const todoToDelete = screen.getByText("Learn React");
    expect(todoToDelete).toBeInTheDocument();

    // Find the delete button for this todo (it's the sibling button)
    const deleteButtons = screen.getAllByText("Delete");

    // Use fireEvent to click the first delete button (for "Learn React")
    fireEvent.click(deleteButtons[0]);

    // Check that the todo is no longer in the document
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();

    // Check that other todos are still there
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("deletes the correct todo when multiple todos exist", () => {
    render(<TodoList />);

    // Add a new todo first using fireEvent
    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "Todo to Delete" } });
    fireEvent.click(screen.getByText("Add Todo"));

    // Verify the new todo exists
    expect(screen.getByText("Todo to Delete")).toBeInTheDocument();

    // Get all delete buttons
    const deleteButtons = screen.getAllByText("Delete");

    // Use fireEvent to click the last delete button (for the newly added todo)
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);

    // Check that the specific todo is deleted
    expect(screen.queryByText("Todo to Delete")).not.toBeInTheDocument();

    // Check that original todos are still there
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("shows empty state message when all todos are deleted", () => {
    render(<TodoList />);

    // Delete all existing todos using fireEvent
    const deleteButtons = screen.getAllByText("Delete");

    for (const button of deleteButtons) {
      fireEvent.click(button);
    }

    // Check for empty state message
    expect(
      screen.getByText("No todos yet. Add one above!")
    ).toBeInTheDocument();
  });

  // Integration Test: Full workflow
  test("supports full todo workflow: add, toggle, and delete", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");

    // Add a new todo using fireEvent
    fireEvent.change(input, { target: { value: "Integration Test Todo" } });
    fireEvent.click(screen.getByText("Add Todo"));

    // Verify todo was added
    const newTodo = screen.getByText("Integration Test Todo");
    expect(newTodo).toBeInTheDocument();
    expect(newTodo).toHaveStyle("text-decoration: none");

    // Toggle the todo to completed using fireEvent
    fireEvent.click(newTodo);
    expect(newTodo).toHaveStyle("text-decoration: line-through");

    // Toggle back to incomplete using fireEvent
    fireEvent.click(newTodo);
    expect(newTodo).toHaveStyle("text-decoration: none");

    // Delete the todo using fireEvent
    const deleteButtons = screen.getAllByText("Delete");
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
    fireEvent.click(lastDeleteButton);

    // Verify todo was deleted
    expect(screen.queryByText("Integration Test Todo")).not.toBeInTheDocument();
  });
});