import { useState } from "react";
import { useRouter } from "next/router";
import { deleteTodo } from "../../services/todos";
import { logError } from "../../services/helper";
import styles from "./Todo.module.css";

interface TodoItem {
  _id: string;
  task: string;
  onDelete: (todoId: string) => void;
}

const TodoItem = ({ _id, task, onDelete }: TodoItem) => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const handleDeleteTodo = async (todoId: string) => {
    try {
      setIsBtnLoading(true);
      await deleteTodo(todoId);
      router.replace(router.asPath);
      onDelete(todoId);
    } catch (error) {
      logError(error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <li className={styles.task}>
      <p className={styles.taskText}>{task}</p>
      <button
        onClick={() => handleDeleteTodo(_id)}
        className={`${styles.button} ${styles.deleteButton}`}
        disabled={isBtnLoading}>
        {isBtnLoading ? "Deleting ..." : "Delete"}
      </button>
    </li>
  );
};

export default TodoItem;
