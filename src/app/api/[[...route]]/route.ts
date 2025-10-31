import { Hono } from "hono";
import { handle } from "hono/vercel";

import booking from "@/routes/bookings/route";
import experinces from "@/routes/experiences/route";
import slots from "@/routes/slots/route";
import promocode from "@/routes/promocode/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/bookings", booking)
  .route("/experiences", experinces)
  .route("/slots", slots)
  .route("/promocode", promocode);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
