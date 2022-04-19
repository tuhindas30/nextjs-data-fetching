import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import MetaTags from "../src/components/MetaTags";
import BackToHome from "../src/components/BackToHome";
const Todo = dynamic(() => import("../src/components/Todo"));
import dbConnect from "../src/lib/db.connect";
import TodoModel from "../src/models/todo.model";

const SSR = ({ todos }: { todos: { _id: string; task: string }[] }) => {
  return (
    <div className="container">
      <MetaTags
        title="Next.js Server Side Rendering"
        description="Demonstrates Next.js Server Side Rendering"
      />
      <BackToHome />
      <main className="main">
        <h1 className="title">Server Side Rendering</h1>
        <ul className="description">
          <li>This page is generated on the server on every request and then sent to
          the client.</li>
          <li>Try updating the TODO list and it immediately gets updated.</li>
          
          <br />
          
        </ul>
        <Todo todos={todos} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const query = await TodoModel.find({});
  const todos = query.map((doc) => {
    const todo = doc.toObject();
    todo._id = todo._id.toString();
    todo.createdAt = todo.createdAt.toString();
    todo.updatedAt = todo.updatedAt.toString();
    return todo;
  });

  return {
    props: {
      todos,
    },
  };
};

export default SSR;
