import express, { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export function AuthenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token ?? req.headers.authorization;

  if (token) {
    jwt.verify(
      token,
      "secret",
      (err: VerifyErrors | null, user: unknown | undefined) => {
        if (err) {
          return res.redirect("/user/login");
        }
        next();
      }
    );
  } else {
    res.redirect("/user/login");
  }
}
