import express from "express";
import { authors } from "../data/seedData.js";
import {
  calculateCurrentBalance
} from "../services/royaltyService.js";
import { createWithdrawal } from "../store/withdrawalStore.js";

const router = express.Router();

/* POST /withdrawals */
router.post("/", (req, res) => {
  const { author_id, amount } = req.body;

  const author = authors.find(a => a.id === author_id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (amount < 500) {
    return res.status(400).json({ error: "Minimum withdrawal is ₹500" });
  }

  const balance = calculateCurrentBalance(author_id);
  if (amount > balance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const withdrawal = createWithdrawal(author_id, amount);

  res.status(201).json({
    ...withdrawal,
    new_balance: calculateCurrentBalance(author_id)
  });
});

export default router;
