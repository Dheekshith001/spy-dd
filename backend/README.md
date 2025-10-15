# Cleftix Backend

## Setup & Run

1. Install dependencies:
   ```powershell
   cd backend
   npm install
   ```
2. Start the backend server:
   ```powershell
   npm start
   ```
   The backend will run on http://localhost:5000

## API Example

- `GET /api/hello` returns `{ message: "Hello from backend!" }`

---

# Connecting Frontend & Backend

- The frontend can make API requests to `http://localhost:5000`.
- Example fetch in frontend:
  ```js
  fetch("http://localhost:5000/api/hello")
    .then((res) => res.json())
    .then((data) => console.log(data));
  ```

# Running the Full Project

1. Start the backend (see above).
2. In a new terminal, start the frontend:
   ```powershell
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (default Vite port).

---

No database is used yet. You can add more API endpoints in `backend/index.js` as needed.
