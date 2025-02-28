import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const todo_schema = z.object({
  id: z.number().int().positive().min(0),
  title: z.string().min(3).max(255),
  done: z.boolean().default(false),
});

const create_todo_schema = todo_schema.omit({ id: true });

type Todo = z.infer<typeof todo_schema>;

const fake_todos: Array<Todo> = [
  { id: 0, title: "make app", done: false },
  { id: 1, title: "buy watch repair tools", done: false },
  { id: 2, title: "apply for jobs", done: false },
];

export const todo_routes = new Hono()
  .get("/", async (c) => {
    return c.json(fake_todos);
  })
  .post("/", zValidator("json", create_todo_schema), async (c) => {
    const data = c.req.valid("json");
    const new_todo = { ...data, id: fake_todos.length };
    fake_todos.push(new_todo);
    return c.json(new_todo, 201);
  });
