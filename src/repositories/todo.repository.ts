import { Collection, SortDirection } from "mongodb";
import { db } from "../db/mongodb";
import { GetTodosPayload, TODO } from "../services/todos.types";

interface GetTodosRequest {
  page: number;
  limit: number;
  sortParam: Record<string, SortDirection>;
}

class TodosRepository {
  collection = db.collection("todos");

  async getTodos({ page, limit, sortParam }: GetTodosRequest) {
    try {
      const skip = (page - 1) * limit;

      const todos = (await this.collection
        .find({})
        .skip(skip)
        .limit(limit)
        .sort(sortParam)
        .toArray()) as unknown as TODO[];

      const totalCount = await this.collection.countDocuments();

      return {
        todos,
        totalCount,
        totalPage: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error("[getTodos]: ", error);
      throw error;
    }
  }
  async getTodo(id: number) {
    try {
      const todo = await this.collection.findOne({ id });
      return todo;
    } catch (error) {
      console.error("[getTodo]: ", error);
      throw error;
    }
  }
  async createTodo(todo: Omit<TODO, "_id">) {
    try {
      await this.collection.insertOne(todo);
      return todo;
    } catch (error) {
      console.error("[createTodo]: ", error);
      throw error;
    }
  }
  async completeTodo(id: number) {
    try {
      const res = await this.collection.updateOne(
        { id },
        { $set: { completed: true } }
      );
      return res;
    } catch (error) {
      console.error("[updateTodo]: ", error);
      throw error;
    }
  }
  async deleteTodo(id: number) {
    try {
      const res = await this.collection.deleteOne({ id });
      return res;
    } catch (error) {
      console.error("[deleteTodo]: ", error);
      throw error;
    }
  }
}

export const todosRepository = new TodosRepository();
