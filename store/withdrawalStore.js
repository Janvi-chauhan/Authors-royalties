export const withdrawals = [];
let counter = 1;

export const createWithdrawal = (authorId, amount) => {
  const record = {
    id: counter++,
    author_id: authorId,
    amount,
    status: "pending",
    created_at: new Date().toISOString()
  };
  withdrawals.push(record);
  return record;
};
