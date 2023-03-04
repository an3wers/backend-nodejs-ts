export type UserType = {
  id: number;
  name: string;
  age: number;
};

export type DBType = { users: UserType[] }

export const db: DBType = {
  users: [
    { id: 1, name: "Eric", age: 32 },
    { id: 2, name: "Jhon", age: 27 },
    { id: 3, name: "Sam", age: 22 },
  ],
};
