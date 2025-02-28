import { Hono } from "hono";
import { todo_routes } from "./todos";

export const api_routes = new Hono().route("/todos", todo_routes);
