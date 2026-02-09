## 📘 Author Royalty API

A REST API for managing author royalties, earnings tracking, and withdrawal requests, built as part of a backend assignment for BookLeaf.

---

### 🔗 Live API

👉 **Deployed URL:**
[https://authors-royalties.onrender.com](https://authors-royalties.onrender.com)

Example test endpoint:
[https://authors-royalties.onrender.com/authors](https://authors-royalties.onrender.com/authors)

---

### 💻 GitHub Repository

👉 **Source Code:**
[https://github.com/Janvi-chauhan/Authors-royalties](https://github.com/Janvi-chauhan/Authors-royalties)

---

### 🛠 Tech Stack & Why

This project is built using **Node.js with Express** for its clean routing, simplicity, and suitability for REST APIs. Data is stored **in memory** to keep the setup lightweight and compatible with the free Render deployment tier.

---

### 📌 Assumptions

Data is stored in memory and resets when the server restarts
All withdrawals are created with a default status of `"pending"`
Author earnings and balances are calculated dynamically from sales data

---

### ⏱ Time Spent

Approximately 4–5 hours, including planning, development, testing, and deployment.

---

### 🚀 How to Run Locally

```bash
npm install
node index.js
```

Then open:
[http://localhost:3000/authors](http://localhost:3000/authors)

---

### Available Endpoints

* `GET /authors`
* `GET /authors/:id`
* `GET /authors/:id/sales`
* `POST /withdrawals`
* `GET /authors/:id/withdrawals`

---

## Notes for Reviewers

* CORS is enabled for all origins
* The API is deployed on Render (free tier)
* The application listens on `process.env.PORT` as required