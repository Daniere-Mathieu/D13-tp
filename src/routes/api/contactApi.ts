import { Router } from "express";
import { ContactService } from "@services/contact";
import { validateRequestBody } from "@utils/validator";
import { missingFieldsResponse } from "@utils/missing";
import contactModel from "@models/contact";
import { AuthenticateJWT } from "@routes/middlewares/auth";
const route = Router();

export default function (app: Router) {
  app.use("/api/contact", route);
  const contactService = ContactService.getInstance();

  route.post("/new", AuthenticateJWT, async (req, res) => {
    if (
      !validateRequestBody(
        req.body,
        ["lastName", "firstName"],
        res,
        "/contact/new",
        missingFieldsResponse
      )
    ) {
      return;
    }

    const contact = new contactModel({
      ...req.body,
    });
    const userId = req.cookies.user;

    contactService.create(contact, userId);
    if (req.is("application/json")) {
      res.status(201).json({ message: "Contact created" });
      return;
    }
    res.redirect("/");
  });

  route.get("/delete/:id", AuthenticateJWT, async (req, res) => {
    contactService.delete(req.params.id);
    if (req.is("application/json")) {
      res.status(201).json({ message: "Contact deleted" });
      return;
    }
    res.redirect("/");
  });

  route.post("/edit/:id", AuthenticateJWT, async (req, res) => {
    if (
      !validateRequestBody(
        req.body,
        ["lastName", "firstName"],
        res,
        "/contact/edit/" + req.params.id,
        missingFieldsResponse
      )
    ) {
      return;
    }

    const contact = new contactModel({
      ...req.body,
    });

    contactService.update(req.params.id, contact);
    if (req.is("application/json")) {
      res.status(201).json({ message: "Contact updated" });
      return;
    }
    res.redirect("/");
  });
}
