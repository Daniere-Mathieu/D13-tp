import { handleUrlErrorQuery } from "@utils/handleError";
import { Router } from "express";

const route = Router();

export default function (app: Router) {
  app.use("/user", route);

  route.get("/login", (req, res) => {
    res.render("connection", { error: handleUrlErrorQuery(req.query) });
  });

  route.get("/register", (req, res) => {
    res.render("register", { error: handleUrlErrorQuery(req.query) });
  });
}
