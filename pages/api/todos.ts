import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../src/lib/db.connect";
import Todo from "../../src/models/todo.model";

const getAllTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const todos = await Todo.find({});
        res.status(200).json({ success: true, data: todos });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "DELETE":
      try {
        await Todo.findByIdAndDelete(req.body.id);
        res.status(201).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default getAllTodos;
