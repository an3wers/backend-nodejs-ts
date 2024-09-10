import { todosRepository } from "../repositories/todo.repository";
import { v4 as uuid } from "uuid";
import { TODO } from "./todos.types";

interface GetTodosResponse {
  todos: TODO[];
  totalPage: number;
  currentPage: number;
  totalCount: number;
}

class TodosService {
  async getTodos({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<GetTodosResponse> {
    const res = await todosRepository.getTodos({ page, limit });
    return res;
  }

  async getTodo(id: number) {
    return await todosRepository.getTodo(id);
  }

  async createTodo(payload: { title: string }) {
    const newTodo: Omit<TODO, "_id"> = {
      id: uuid(),
      userId: 1,
      title: payload.title,
      completed: false,
    };

    return await todosRepository.createTodo(newTodo);
  }

  async completeTodo(id: number) {
    return await todosRepository.completeTodo(id);
  }
  async deleteTodo(id: number) {
    return await todosRepository.deleteTodo(id);
  }
}

export const todosService = new TodosService();
