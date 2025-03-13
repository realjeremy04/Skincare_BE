import AccountAPI from "$root/controllers/Account.controller";
import { Router } from "express";

const router = Router();

//Authentications routes
router.post("/login", AccountAPI.login);
router.post("/register", AccountAPI.register);
router.get("/logout", AccountAPI.logout);

router.get("/", AccountAPI.getAllAccounts);
router.post("/", AccountAPI.createAccount);
router.get("/:id", AccountAPI.getAccount);
router.delete("/:id", AccountAPI.deleteAccount);
router.put("/:id", AccountAPI.updateAccount);



export default router;
