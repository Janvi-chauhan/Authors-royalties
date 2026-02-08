import { books, sales } from "../data/seedData.js";
import { withdrawals } from "../store/withdrawalStore.js";

export const calculateTotalEarnings = (authorId) => {
  return books
    .filter(b => b.author_id === authorId)
    .reduce((total, book) => {
      const sold = sales
        .filter(s => s.book_id === book.id)
        .reduce((sum, s) => sum + s.quantity, 0);
      return total + sold * book.royalty;
    }, 0);
};

export const calculateCurrentBalance = (authorId) => {
  const withdrawn = withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);

  return calculateTotalEarnings(authorId) - withdrawn;
};
