import { ContactService } from "@services/contact";
import { Sector } from "@src/enum";
import { handleUrlErrorQuery } from "@utils/handleError";
import { Router } from "express";
import { AuthenticateJWT } from "./middlewares/auth";

const route = Router();

export default function (app: Router) {
  app.use("/contact", route);
  const contactService = ContactService.getInstance();

  route.get("/", AuthenticateJWT, async (req, res) => {
    const userId = req.cookies.user;
    const contacts = await contactService.find(userId);
    res.render("home", { contacts: contacts });
  });

  route.get("/new", AuthenticateJWT, (req, res) => {
    res.render("add-item", {
      error: handleUrlErrorQuery(req.query),
      sectors: Object.values(Sector),
    });
  });

  route.get("/edit/:id", AuthenticateJWT, async (req, res) => {
    console.log(await contactService.findOne(req.params.id));
    res.render("edit-item", {
      error: handleUrlErrorQuery(req.query),
      sectors: Object.values(Sector),
      contact: await contactService.findOne(req.params.id),
    });
  });

  route.get("/detail/:id", AuthenticateJWT, async (req, res) => {
    const contact = await contactService.findOne(req.params.id);
    res.render("item", {
      contact: contact,
    });
  });
}
