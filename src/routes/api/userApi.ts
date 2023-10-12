import { validateRequestBody } from "@utils/validator";
import { Router } from "express";
import { UserService } from "@services/user";
import UserModel from "@models/user";
import { missingFieldsResponse } from "@utils/missing";
import jwt from "jsonwebtoken";
const route = Router();

export default function (app: Router) {
  app.use("/api/user", route);
  const userService = UserService.getInstance();

  route.post("/login", async (req, res) => {
    if (
      !validateRequestBody(
        req.body,
        ["email", "password"],
        res,
        "/user/login",
        missingFieldsResponse
      )
    ) {
      return;
    }

    const email = req.body.email;
    const password = req.body.password;

    const { verified, user } = await userService.verify(email, password);
    if (!verified || !user) {
      if (req.is("application/json")) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      res.redirect("/user/login?error=Invalid-credentials");
      return;
    }
    const token = jwt.sign({ email: email }, "secret", { expiresIn: "2d" });
    if (req.is("application/json")) {
      res.status(201).json({ token: token, user: user._id });
      return;
    }
    res.cookie("token", token, {
      maxAge: 172800000,
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.cookie("user", user._id, {
      maxAge: 172800000,
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.redirect("/");
  });

  route.post("/register", async (req, res) => {
    if (
      !validateRequestBody(
        req.body,
        ["email", "password", "firstName", "lastName"],
        res,
        "/user/register",
        missingFieldsResponse
      )
    ) {
      return;
    }

    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const isCreate = await userService.create(user);
    if (!isCreate) {
      if (req.is("application/json")) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }
      res.redirect("/user/register?error=Email-already-exists");
      return;
    }
    if (req.is("application/json")) {
      res.status(201).json({ message: "User created" });
      return;
    }
    res.redirect("/user/login");
  });
}
