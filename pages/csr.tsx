import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MetaTags from "../src/components/MetaTags";
import BackToHome from "../src/components/BackToHome";
const Todo = dynamic(() => import("../src/components/Todo"));
import { getAllTodos } from "../src/services/todos";
import { logError } from "../src/services/helper";
import { Todo } from "../src/types/todo.types";

const SSR = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllTodos();
        setTodos(response.data);
      } catch (error) {
        logError(error);
      }
    })();
  }, [todos.length]);

  return (
    <div className="container">
      <MetaTags
        title="Next.js Client Side Rendering"
        description="Demonstrates Next.js Client Side Rendering"
      />
      <BackToHome />
      <main className="main">
        <h1 className="title">Client Side Rendering</h1>
        <ul className="description">
          <li>This page is rendered on the client (browser).</li>
          <li>
            Try disabling the javascript and notice the data is not fetched.
          </li>
        </ul>
        <Todo
          todos={todos}
          onAdd={(todos) => setTodos((state) => [...state, todos])}
          onDelete={(todos) => setTodos(todos)}
        />
      </main>
    </div>
  );
};

export default SSR;
