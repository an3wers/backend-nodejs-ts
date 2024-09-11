import { todosRepository } from "../repositories/todo.repository";
import { v4 as uuid } from "uuid";
import { GetTodosPayload, TODO } from "./todos.types";
import { getSortTodos } from "../helpers/getSortTodos";

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
    orderBy,
    sortBy,
  }: GetTodosPayload): Promise<GetTodosResponse> {
    const sortParam = getSortTodos(sortBy, orderBy);

    const res = await todosRepository.getTodos({ page, limit, sortParam });
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
