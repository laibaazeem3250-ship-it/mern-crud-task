# MERN CRUD Task Manager

A full-stack task manager built to satisfy the "MERN CRUD Integration" task:
React frontend connected to an Express + MongoDB backend with full
create, read, update, delete operations end-to-end.

- Frontend calls the backend API using **axios**
- UI updates in real time on every CRUD operation (no page reloads)
- Basic error handling on **both** the client (try/catch + on-screen error
  messages) and the server (validation errors, 404s, malformed IDs, 500s)

## Project structure

```
mern-crud/
├── backend/     Express + Mongoose REST API
└── frontend/    React (Vite) client
```

## 1. Get a MongoDB database

Easiest option — MongoDB Atlas (free tier):
1. Go to https://www.mongodb.com/cloud/atlas/register and create a free cluster.
2. Under **Database Access**, create a user with a password.
3. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render/Vercel can connect.
4. Click **Connect > Drivers**, copy the connection string — it looks like:
   `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mern_crud?retryWrites=true&w=majority`

## 2. Run the backend locally

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your MONGO_URI
npm run dev        # or: npm start
```

The API runs at `http://localhost:5000`. Test it:
```bash
curl http://localhost:5000/api/tasks
```

### API reference

| Method | Route             | Description       |
|--------|-------------------|--------------------|
| GET    | /api/tasks        | List all tasks     |
| GET    | /api/tasks/:id    | Get one task       |
| POST   | /api/tasks        | Create a task      |
| PUT    | /api/tasks/:id    | Update a task      |
| DELETE | /api/tasks/:id    | Delete a task      |

## 3. Run the frontend locally

```bash
cd frontend
npm install
cp .env.example .env
# edit .env if your backend isn't on localhost:5000
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 4. Push to GitHub

```bash
cd mern-crud
git init
git add .
git commit -m "MERN CRUD task manager"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 5. Deploy (for the "Deployed full-stack MERN app URL" deliverable)

**Backend → Render**
1. https://render.com → New > Web Service → connect your GitHub repo.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGO_URI`, `CLIENT_ORIGIN` (set this to your
   Vercel frontend URL once you have it, e.g. `https://your-app.vercel.app`)
6. Deploy — copy the resulting URL (e.g. `https://your-api.onrender.com`).

**Frontend → Vercel**
1. https://vercel.com → New Project → import the same GitHub repo.
2. Root directory: `frontend`
3. Framework preset: Vite (auto-detected)
4. Add environment variable: `VITE_API_URL` = `https://your-api.onrender.com/api/tasks`
5. Deploy — copy the resulting URL. That's your submission link.

Once both are live, go back to Render and update `CLIENT_ORIGIN` to the
final Vercel URL so CORS allows requests from your deployed frontend.

## Acceptance criteria checklist

- [x] Frontend calls backend API using fetch or axios (axios instance in `frontend/src/api/axios.js`)
- [x] UI updates in real time on CRUD operations (React state updates on create/update/delete, no reload)
- [x] Basic error handling on both client and server (try/catch + error banners in React; validation, 404, and 500 handling in Express controllers)
