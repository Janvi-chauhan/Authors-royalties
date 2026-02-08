import express from "express";
import { authors, books, sales } from "../data/seedData.js";
import {
  calculateTotalEarnings,
  calculateCurrentBalance
} from "../services/royaltyService.js";
import { withdrawals } from "../store/withdrawalStore.js";

const router = express.Router();

/* GET /authors */
router.get("/", (req, res) => {
  res.json(
    authors.map(a => ({
      id: a.id,
      name: a.name,
      total_earnings: calculateTotalEarnings(a.id),
      current_balance: calculateCurrentBalance(a.id)
    }))
  );
});

/* GET /authors/:id */
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books
    .filter(b => b.author_id === author.id)
    .map(b => {
      const totalSold = sales
        .filter(s => s.book_id === b.id)
        .reduce((sum, s) => sum + s.quantity, 0);

      return {
        id: b.id,
        title: b.title,
        royalty_per_sale: b.royalty,
        total_sold: totalSold,
        total_royalty: totalSold * b.royalty
      };
    });

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_books: authorBooks.length,
    total_earnings: calculateTotalEarnings(author.id),
    current_balance: calculateCurrentBalance(author.id),
    books: authorBooks
  });
});

/* GET /authors/:id/sales */
router.get("/:id/sales", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const bookIds = books
    .filter(b => b.author_id === author.id)
    .map(b => b.id);

  const result = sales
    .filter(s => bookIds.includes(s.book_id))
    .map(s => {
      const book = books.find(b => b.id === s.book_id);
      return {
        book_title: book.title,
        quantity: s.quantity,
        royalty_earned: s.quantity * book.royalty,
        sale_date: s.date
      };
    })
    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));

  res.json(result);
});

/* GET /authors/:id/withdrawals */
router.get("/:id/withdrawals", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(
    withdrawals
      .filter(w => w.author_id == author.id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  );
});

export default router;
