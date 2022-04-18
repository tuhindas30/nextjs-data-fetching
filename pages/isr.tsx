import type { GetStaticProps } from "next";
import { connect } from "mongoose";
import dynamic from "next/dynamic";
import MetaTags from "../src/components/MetaTags";
import BackToHome from "../src/components/BackToHome";
const Todo = dynamic(() => import("../src/components/Todo"));
// import dbConnect from "../src/lib/db.connect";
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
        <p className="description">
          This page was generated statically at the time of build. But this page
          updates after every 3 seconds.
          <br />
          Try updating the TODO list and it won&apos;t get updated immediately.
          Try to reload the page after 3 seconds and see the updated data.
        </p>
        <Todo todos={todos} />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI");
  }
  connect(MONGODB_URI)
    .then((mongoose) => {
      console.log("Successfully connected to MongoDB");
      return mongoose;
    })
    .catch(() => {
      console.log("Error connecting to MongoDB");
    });
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
