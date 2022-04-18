import { SyntheticEvent, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { addTodo } from "../../services/todos";
import { Todo } from "../../types/todo.types";
const TodoItem = dynamic(() => import("./TodoItem"));
import { logError } from "../../services/helper";
import styles from "./Todo.module.css";

interface TodoProps {
  todos: Todo[];
  onAdd?: (todo: Todo) => void;
  onDelete?: (todo: Todo[]) => void;
}

const Todo = ({ todos, onAdd, onDelete }: TodoProps) => {
  const [taskInput, setTaskInput] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const handleAddTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsBtnLoading(true);
      const response = await addTodo(taskInput);
      setTaskInput("");
      router.replace(router.asPath);
      if (!onAdd) return;
      onAdd(response.data);
    } catch (error) {
      logError(error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  const handleDeleteTodo = (todoId: string) => {
    if (!onDelete) return;
    const filteredTodos = todos.filter((todo) => todo._id !== todoId);
    onDelete(filteredTodos);
  };

  return (
    <section className={styles.todoContainer}>
      <form onSubmit={handleAddTodo}>
        <h2 className={styles.formTitle}>Add a new TO-DO</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type="submit"
            className={styles.button}
            disabled={isBtnLoading}>
            {isBtnLoading ? "Adding ..." : "Add"}
          </button>
        </div>
      </form>
      {todos.length > 0 && (
        <ul className={styles.taskContainer}>
          <h2 className={styles.formTitle}>My TO-DOs</h2>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              {...todo}
              onDelete={(todoId) => handleDeleteTodo(todoId)}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Todo;
