import request from "supertest";
import { app } from "../../src";

describe("/users", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should return 404 for not existing user", async () => {
    const res = await request(app).get("/users/999999");
    expect(res.statusCode).toBe(404);
  });

  it("should not create user with incorrect input data", async () => {
    const res = await request(app).post("/users").send({ name: "" });
    expect(res.statusCode).toBe(400);

    // check empty array
    const result = await request(app).get("/users");
    expect(result.body).toEqual([]);

  });

  it("should create new user", async () => {
    const res = await request(app).post("/users").send({name: 'New User'})
    expect(res.statusCode).toBe(201)

    const createdUser = res.body
    expect(createdUser).toEqual({
        id:expect.any(Number),
        name: 'New User'
    })

    const result = await request(app).get("/users");
    expect(result.body).toEqual([createdUser]);

  })
});
