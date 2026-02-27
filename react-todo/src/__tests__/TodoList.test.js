import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList.jsx";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  fireEvent.change(screen.getByPlaceholderText(/New Todo/i), { target: { value: "Test Todo" } });
  fireEvent.click(screen.getByText(/Add/i));
  expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText(/Learn React/i);
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const deleteBtn = screen.getAllByText(/Delete/i)[0];
  fireEvent.click(deleteBtn);
  expect(screen.queryByText(/Learn React/i)).not.toBeInTheDocument();
});