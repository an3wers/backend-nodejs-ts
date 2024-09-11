import { SortDirection } from "mongodb";

export const getSortTodos = (
  sortBy: string,
  orderBy: "asc" | "desc" | string
): Record<string, SortDirection> => {
  const sortParams: Record<string, string> = {
    date: "createdAt",
  };

  const sort = sortParams[sortBy] || "createdAt";

  return orderBy === "desc" ? { [sort]: -1 } : { [sort]: 1 };
};
