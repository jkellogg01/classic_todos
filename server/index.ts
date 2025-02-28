import { Hono } from "hono";
import { logger } from "hono/logger";
import { api_routes } from "./routes/api";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(logger());

app.route("/api", api_routes);

app.get("*", serveStatic({ root: "../client/dist" }));
app.get("*", serveStatic({ path: "../client/dist/index.html" }));

export default app;
