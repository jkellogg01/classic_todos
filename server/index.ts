import { Hono } from "hono";
import { logger } from "hono/logger";
import { api_routes } from "./routes/api";

const app = new Hono();

app.use(logger());

app.route("/api", api_routes);

export default app;
