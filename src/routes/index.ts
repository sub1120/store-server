import express, { Router } from "express";

import storeRouter from "./store.router";

const appRouter = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const routes: IRoute[] = [
  {
    path: "/store",
    route: storeRouter,
  },
];

routes.forEach((route: IRoute) => {
  appRouter.use(route.path, route.route);
});

export default appRouter;
