import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // Test 1: Initial Render Test
  test("renders TodoList component correctly", () => {
    render(<TodoList />);

    // Check if the title is rendered
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Check if the add todo form is rendered
    expect(
      screen.getByPlaceholderText("Add a new todo...")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();

    // Check if initial todos are rendered
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

  // Test 2: Adding Todos
  test("adds a new todo when form is submitted", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");

    // Type in the input field
    await user.type(input, "New Test Todo");

    // Submit the form
    await user.click(addButton);

    // Check if the new todo is added
    expect(screen.getByText("New Test Todo")).toBeInTheDocument();

    // Check if input field is cleared
    expect(input).toHaveValue("");
  });

  test("does not add empty todos", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const addButton = screen.getByText("Add Todo");
    const initialTodos = screen.getAllByText(/Delete/);
    const initialTodoCount = initialTodos.length;

    // Try to submit empty form
    await user.click(addButton);

    // Check that no new todo was added
    const afterTodos = screen.getAllByText(/Delete/);
    expect(afterTodos).toHaveLength(initialTodoCount);
  });

  test("does not add todos with only whitespace", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");
    const initialTodos = screen.getAllByText(/Delete/);
    const initialTodoCount = initialTodos.length;

    // Type only whitespace
    await user.type(input, "   ");
    await user.click(addButton);

    // Check that no new todo was added
    const afterTodos = screen.getAllByText(/Delete/);
    expect(afterTodos).toHaveLength(initialTodoCount);
  });

  // Test 3: Toggling Todos
  test("toggles todo completion status when clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const todoText = screen.getByText("Learn React");

    // Initially should not be completed
    expect(todoText).toHaveStyle("text-decoration: none");

    // Click to toggle completion
    await user.click(todoText);

    // Should now be completed
    expect(todoText).toHaveStyle("text-decoration: line-through");

    // Click again to toggle back
    await user.click(todoText);

    // Should be back to incomplete
    expect(todoText).toHaveStyle("text-decoration: none");
  });

  test("toggles already completed todo back to incomplete", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const completedTodo = screen.getByText("Write Tests");

    // Initially should be completed
    expect(completedTodo).toHaveStyle("text-decoration: line-through");

    // Click to toggle
    await user.click(completedTodo);

    // Should now be incomplete
    expect(completedTodo).toHaveStyle("text-decoration: none");
  });

  // Test 4: Deleting Todos
  test("deletes a todo when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Find the todo and its delete button
    const todoToDelete = screen.getByText("Learn React");
    expect(todoToDelete).toBeInTheDocument();

    // Find the delete button for this todo (it's the sibling button)
    const deleteButtons = screen.getAllByText("Delete");

    // Click the first delete button (for "Learn React")
    await user.click(deleteButtons[0]);

    // Check that the todo is no longer in the document
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();

    // Check that other todos are still there
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("deletes the correct todo when multiple todos exist", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add a new todo first
    const input = screen.getByPlaceholderText("Add a new todo...");
    await user.type(input, "Todo to Delete");
    await user.click(screen.getByText("Add Todo"));

    // Verify the new todo exists
    expect(screen.getByText("Todo to Delete")).toBeInTheDocument();

    // Get all delete buttons
    const deleteButtons = screen.getAllByText("Delete");

    // Click the last delete button (for the newly added todo)
    await user.click(deleteButtons[deleteButtons.length - 1]);

    // Check that the specific todo is deleted
    expect(screen.queryByText("Todo to Delete")).not.toBeInTheDocument();

    // Check that original todos are still there
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("shows empty state message when all todos are deleted", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Delete all existing todos
    const deleteButtons = screen.getAllByText("Delete");

    for (const button of deleteButtons) {
      await user.click(button);
    }

    // Check for empty state message
    expect(
      screen.getByText("No todos yet. Add one above!")
    ).toBeInTheDocument();
  });

  // Integration Test: Full workflow
  test("supports full todo workflow: add, toggle, and delete", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");

    // Add a new todo
    await user.type(input, "Integration Test Todo");
    await user.click(screen.getByText("Add Todo"));

    // Verify todo was added
    const newTodo = screen.getByText("Integration Test Todo");
    expect(newTodo).toBeInTheDocument();
    expect(newTodo).toHaveStyle("text-decoration: none");

    // Toggle the todo to completed
    await user.click(newTodo);
    expect(newTodo).toHaveStyle("text-decoration: line-through");

    // Toggle back to incomplete
    await user.click(newTodo);
    expect(newTodo).toHaveStyle("text-decoration: none");

    // Delete the todo
    const deleteButtons = screen.getAllByText("Delete");
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
    await user.click(lastDeleteButton);

    // Verify todo was deleted
    expect(screen.queryByText("Integration Test Todo")).not.toBeInTheDocument();
  });
});
