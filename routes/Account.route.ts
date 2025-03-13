import AccountAPI from "$root/controllers/Account.controller";
import { auth, isAdmin } from "$root/middleware/auth";
import { Router } from "express";

const router = Router();

//Authentications routes
router.post("/login", AccountAPI.login);
router.post("/register", AccountAPI.register);
router.get("/logout", AccountAPI.logout);


router.get("/", AccountAPI.getAllAccounts);
router.post("/", AccountAPI.createAccount);

router.get("/:id", auth,  AccountAPI.getAccount);
router.delete("/:id", auth, isAdmin, AccountAPI.deleteAccount);
router.put("/:id", auth, AccountAPI.updateAccount);
router.post("/changePassword", auth, AccountAPI.changePassword);





export default router;
