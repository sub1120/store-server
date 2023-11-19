import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

import AppErr from "@/utils/appErr";
import HTTP_STATUS from "@/utils/httpStatus";

import asyncHandler from "./asyncHandler.middleware";

export const isLoggedIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      return next(
        new AppErr(
          "You are not authorized, please login",
          HTTP_STATUS.UNAUTHORIZED,
        ),
      );
    }

    const payload = await getAuth().verifyIdToken(token);

    if (!payload) {
      return next(
        new AppErr("Unauthorized, please login", HTTP_STATUS.UNAUTHORIZED),
      );
    }

    next();
  },
);
