import { Schema, model, models, Model } from "mongoose";
import { Todo } from "../types/todo.types";

const TodoSchema = new Schema<Todo, Model<Todo>, Todo>(
  {
    task: {
      type: String,
      required: [true, "Cannot have empty task"],
    },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || model<Todo>("Todo", TodoSchema);

export default Todo;
