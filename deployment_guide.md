# ResuMind AI - Deployment & Connection Guide

This guide describes how to configure, connect, and deploy the three layers of the **ResuMind AI** full-stack application (Backend, Frontend, and Dashboard) using cloud hosting platforms like **Render** and **Vercel**.

---

## 1. 🗄️ Database Setup (MongoDB Atlas)
ResuMind AI requires a MongoDB database cluster.
1. Sign up/log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (M0) in a region close to your users.
3. In **Security -> Database Access**, create a user (write down the username and password).
4. In **Security -> Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere** (`0.0.0.0/0`) so the Render web service can connect.
5. In **Database -> Clusters**, click **Connect -> Drivers -> Node.js** to copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/resume_analytics?retryWrites=true&w=majority
   ```

---

## 2. ⚙️ Deploying the Backend (Render Web Service)
Render is an excellent host for the Node/Express backend.
1. Log in at [Render](https://render.com/).
2. Click **New + -> Web Service**.
3. Connect your GitHub repository (`https://github.com/khushalkks/AptitudeX`).
4. Set the following configurations:
   * **Name**: `resumind-api`
   * **Root Directory**: `backend`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node index.js`
5. Under **Environment Variables**, add the following keys matching your `.env` settings:
   * `PORT`: `5000` (Render will override this, but standard reference is helpful)
   * `MONGODB_URI`: *[Your MongoDB connection string]*
   * `JWT_SECRET`: *[A long random secret string]*
   * `GEMINI_API_KEY`: *[Your Google AI Studio Gemini API key]*
   * `COHERE_API_KEY`: *[Your Cohere key for ATS parsing]*
   * `OPENAI_API_KEY`: *[Your OpenAI key for resume parsing]*
   * `RAPIDAPI_KEY`: *[Your JSearch RapidAPI key for salary insights]*
6. Click **Deploy Web Service** and copy the live URL once active (e.g., `https://resumind-api.onrender.com`).

---

## 3. 🖥️ Deploying the Dashboard (Vercel or Render Static Site)
The Dashboard app handles the main application workspace.
1. Under **dashboard/src/pages/GithubAnalyzer.jsx**, ensure it accesses the backend URL dynamically via `import.meta.env.VITE_API_BASE_URL`.
2. Connect your repository on Vercel or Render.
3. Configure the dashboard deployment:
   * **Root Directory**: `dashboard`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Set the **Environment Variables**:
   * `VITE_API_BASE_URL`: `https://resumind-api.onrender.com/api` (Point to your live backend service)
   * `VITE_SOCKET_URL`: `https://resumind-api.onrender.com`
   * `VITE_FRONTEND_URL`: *[Your live Login page URL - see Section 4]*
5. Click **Deploy**. Copy the live dashboard URL (e.g. `https://resumind-dashboard.vercel.app`).

---

## 4. 🔑 Deploying the Login Frontend (Vercel or Render Static Site)
The frontend app houses the login and signup flow.
1. Connect your repository.
2. Configure the deployment:
   * **Root Directory**: `frontend`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Set the **Environment Variables**:
   * `VITE_API_BASE_URL`: `https://resumind-api.onrender.com/api`
   * `VITE_DASHBOARD_URL`: `https://resumind-dashboard.vercel.app` (Point to your live dashboard URL)
4. Click **Deploy**. Copy the live login frontend URL (e.g. `https://resumind-login.vercel.app`).

---

## 5. 🔄 Final Connection Loop Adjustment
To complete the loop, update your backend Render environment variables:
* In your Render dashboard, navigate to your **Backend Web Service** -> **Environment**.
* Add the environment key:
  * `FRONTEND_URL`: `https://resumind-login.vercel.app` (This allows CORS requests from your live login client)
* Save changes. Render will automatically redeploy the service, completing the secure production environment connection!
