import TransactionAPI from "$root/controllers/Transaction.controller";
import { Router } from "express";

const router = Router();

router.get("/", TransactionAPI.getAllTransactions);
router.post("/", TransactionAPI.createTransaction);
router.get("/:transactionId", TransactionAPI.getTransaction);
router.delete("/:transactionId", TransactionAPI.deleteTransaction);
router.put("/:transactionId", TransactionAPI.updateTransaction);

export default router;
