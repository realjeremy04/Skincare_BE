import AccountAPI from "$root/controllers/Account.controller";
import { Router } from "express";

const router = Router();

router.get("/", AccountAPI.getAllAccounts);
router.post("/", AccountAPI.createAccount);
router.get("/:id", AccountAPI.getAccount);
router.delete("/:id", AccountAPI.deleteAccount);
router.put("/:id", AccountAPI.updateAccount);

export default router;
