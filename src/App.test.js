import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import TodoList from "./TodoList";
import "@testing-library/jest-dom";

test("renders todo title", () => {
  render(<App />);
  const el = screen.getByText(/Todo List/);
  expect(el).toBeInTheDocument();
});

const initTodoList = () => {
  const el = render(<TodoList />);
  const input = screen.getByLabelText("description-input");
  fireEvent.change(input, { target: { value: "Todo item 1" } });
  fireEvent.click(screen.getByTestId("addButton"));
  fireEvent.change(input, { target: { value: "Todo item 2" } });
  fireEvent.click(screen.getByTestId("addButton"));
  fireEvent.change(input, { target: { value: "Todo item 3" } });
  fireEvent.click(screen.getByTestId("addButton"));
  return {
    input,
    ...el,
  };
};

test("Add a todo item", async () => {
  initTodoList();
  const el = screen.getByText(/Todo item 1/);
  expect(el).toBeInTheDocument();
});

test("Remove a todo item", async () => {
  initTodoList();
  const item2 = screen.getByText(/Todo item 2/);
  const buttons = screen.getAllByText("Delete");
  fireEvent.click(buttons[1]);

  expect(item2).not.toBeInTheDocument();
  expect(screen.getAllByText("Delete")).toHaveLength(2);
});

test("Complete a todo item", async () => {
  initTodoList();
  const checkboxes = screen.getAllByLabelText("checkbox-input");
  fireEvent.click(checkboxes[0]);

  expect(checkboxes[0]).toBeChecked();
  expect(checkboxes[1]).not.toBeChecked();
  expect(checkboxes[2]).not.toBeChecked();
});

test("Remove a todo item with same description", async () => {
  const {input} = initTodoList();
  fireEvent.change(input, { target: { value: "Todo item 2" } });
  fireEvent.click(screen.getByTestId("addButton"));

  const items = screen.getAllByText(/Todo item 2/);
  const buttons = screen.getAllByText("Delete");
  fireEvent.click(buttons[3]);

  expect(items[0]).toBeInTheDocument();
  expect(items[1]).not.toBeInTheDocument();
  expect(screen.getAllByText("Delete")).toHaveLength(3);
});
