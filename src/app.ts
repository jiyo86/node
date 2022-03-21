import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ExpressValidator from "express-validator";
import users from "./routes/users";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ExpressValidator());

app.use("/", users);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  res.status(404).json("Endpoint not found");
});

var port = process.env.PORT || "8080";
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
