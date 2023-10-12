import { Router } from "express";
import user from "./user";
import contact from "./contact";
import userApi from "./api/userApi";
import contactApi from "./api/contactApi";

export default function (app: Router) {
  user(app);
  contact(app);
  userApi(app);
  contactApi(app);
}
