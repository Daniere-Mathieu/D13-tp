import express from "express";
import routes from "@routes/index";
import cookieParser from "cookie-parser";

export default async function () {
  const app = express();

  app.set("views", process.cwd() + "/src/views");
  app.set("view engine", "ejs");

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());

  routes(app);

  app.get("*", (req, res) => {
    res.redirect("/contact");
  });
  const port = (global as any).env.express.port;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
