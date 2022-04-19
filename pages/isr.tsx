import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import MetaTags from "../src/components/MetaTags";
import BackToHome from "../src/components/BackToHome";
const Todo = dynamic(() => import("../src/components/Todo"));
import dbConnect from "../src/lib/db.connect";
import TodoModel from "../src/models/todo.model";

const ISR = ({ todos }: { todos: { _id: string; task: string }[] }) => {
  return (
    <div className="container">
      <MetaTags
        title="Next.js Incremental Static Regeneration"
        description="Demonstrates Next.js Incremental Static Regeneration"
      />
      <BackToHome />
      <main className="main">
        <h1 className="title">Incremental Static Regeneration</h1>
        <ul className="description">
          <li>This page gets rebuild after any data update.</li>
          <li>
            Try updating the TODO list and it won&apos;t get updated
            immediately.
          </li>
          <li>
            Try to reload the page after few seconds and see the updated data.
          </li>
        </ul>
        <Todo todos={todos} />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
    revalidate: 1,
  };
};

export default ISR;
