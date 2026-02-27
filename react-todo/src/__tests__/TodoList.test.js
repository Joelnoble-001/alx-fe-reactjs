import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {

  // Initial render test
  test("renders initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
  });

  // Add todo test
  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("New Todo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, {
      target: { value: "Test Todo" }
    });

    fireEvent.click(addButton);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  // Toggle todo test
  test("toggles todo completion", () => {
    render(<TodoList />);

    const todo = screen.getByText("Learn React");

    fireEvent.click(todo);

    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  // Delete todo test
  test("deletes a todo", () => {
    render(<TodoList />);

    const deleteButtons = screen.getAllByText("Delete");

    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });

});