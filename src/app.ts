import "dotenv/config";

import cors from "cors";
import express from "express";

import HTTP_STATUS from "./utils/httpStatus";

const expressApp = express();

// Builtin Middlewares
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// Third-party Middlewares
expressApp.use(
  cors({
    credentials: true,
    optionsSuccessStatus: HTTP_STATUS.OK,
  }),
);

/**
 * @SERVER_STATUS
 * @ROUTE @GET {{URL}}/api/ping
 * @DESC Returns response 200 with message pong if api is working
 * @ACCESS Public
 */
expressApp.get("/api/ping", (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    status: "UP",
    message: "PONG",
  });
});

// CatchAll - 404 --- This should be after all the other routes
expressApp.all("*", (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
});

export default expressApp;
