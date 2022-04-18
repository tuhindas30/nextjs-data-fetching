import { logError } from "./helper";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://nextjs-data-fetch";

const getAllTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos`);
    return response.json();
  } catch (error) {
    logError(error);
  }
};

const addTodo = async (task: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
      method: "post",
      body: JSON.stringify({ task }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    logError(error);
  }
};

const deleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
      method: "delete",
      body: JSON.stringify({ id: todoId }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    logError(error);
  }
};

export { getAllTodos, addTodo, deleteTodo };
