import express from "express";
import cors from "cors";
import "dotenv/config";

import authorRoutes from "./routes/authorRoutes.js";
import withdrawalRoutes from "./routes/withdrawalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/withdrawals", withdrawalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
