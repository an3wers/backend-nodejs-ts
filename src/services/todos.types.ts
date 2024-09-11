export interface TODO {
  _id: string;
  id: string;
  userId: number;
  title: string;
  completed: boolean;
}

export interface GetTodosPayload {
  page: number;
  limit: number;
  sortBy: string;
  orderBy: string;
}
