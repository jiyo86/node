import express, { Request, Response, NextFunction } from "express";
import users from "../controller/users";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});
router.get("/userlist", users.userlist);
router.post("/adduser", users.validate(), users.adduser);

export default router;
