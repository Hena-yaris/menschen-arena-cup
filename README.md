
# 🏆 Menschen Arena Cup 2025/26

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An authentic, live tracking tournament web application designed to bring campus sports culture to life. The Menschen Arena Cup platform tracks every score, logs live team standings, monitors player metrics (such as top scorers and Man of the Match awards), and keeps fans engaged with an interactive match prediction system.

---

## 🌍 Live Demo

Experience the live application:

🔗 [Open Menschen Arena Cup](https://menschenarena.netlify.app/)


---

## 🎯 Key Features

### 👥 Public Features

- **Live Standings**  
  Real time calculation of points, goal differences, and league rankings.

- **Match Schedules & Fixtures**  
  Easy to read timeline of upcoming matches, ongoing games, and completed fixtures.

- **Player Statistics**  
  Dedicated tracking for individual player achievements, including Golden Boot leaders and MOTM awards.

- **Fan Engagement Widget**  
  “Don’t Miss the Action” prediction card that encourages students to watch matches live and compete for rewards.

---

### 🛡️ Admin Features (Protected)

- **Secure Authentication**  
  Protected backend routes and frontend login system for authorized admin access only.

- **Dynamic Match Management**  
  Create matches, update live scores, and manage tournament statistics in real time.

- **Tournament Reset Controls**  
  Quick-action admin endpoints for safely resetting tournament data between seasons.

---

## 🛠️ Tech Stack & Architecture

This project is built using a decoupled **MERN Architecture** for fast frontend rendering and scalable backend performance.

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

---

## 📁 Project Structure

```text
menschen-arena-cup/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication middleware
│   ├── .env                # Environment variables
│   └── app.js              # Express server entry point
│
└── client/
    ├── src/
    │   ├── api/            # Axios configurations
    │   ├── components/     # Reusable UI components
    │   ├── pages/
    │   │   ├── Public/     # Public pages
    │   │   └── Admin/      # Admin dashboard pages
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── .env.production
    └── vite.config.js
```

---

# ⚙️ Installation & Local Setup

Follow these steps to run the project locally.

## 📌 Prerequisites

Make sure you have:

- Node.js installed
- A MongoDB Atlas account

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Hena-yaris/menschen-arena-cup.git

cd menschen-arena-cup
```

---

## 2️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

Inside the `backend/` folder:

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mzxlneh.mongodb.net/menschenCup?retryWrites=true&w=majority
```

### Start the backend server

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
```

### Install dependencies

```bash
npm install
```

### Start the Vite development server

```bash
npm run dev
```

---

## 🚀 Open the App

Visit:

```text
http://localhost:5173
```

The frontend will automatically proxy API requests to the backend server running on port `5000`.

---

# 🌐 Production Deployment

The project is production-ready and supports scalable deployment architecture.

## Backend Hosting

- Deployed on **Render**
- Environment variables managed securely
- Automatic deployment through GitHub integration

## Database Hosting

- Hosted on **MongoDB Atlas**
- Secure cloud database configuration
- Network access configured for deployment environments

## Frontend Hosting

- Hosted on **Netlify**
- SPA routing supported using `_redirects`
- Optimized static deployment workflow

---

# 🧠 Learning Journey & Key Takeaways

Building this project helped strengthen understanding of several real-world software engineering concepts:

### 1. Cloud Database Networking

Diagnosed and fixed `MongooseServerSelectionError` issues by:

- Configuring MongoDB Atlas network access
- Debugging firewall restrictions
- Understanding free tier database sleep behavior

### 2. Decoupled API Architecture

Learned how to:

- Connect frontend and backend services cleanly
- Configure Vite proxy systems
- Manage dynamic API environments using `import.meta.env`

### 3. Data Integrity & State Synchronization

Implemented logic to:

- Recalculate standings automatically
- Maintain consistent leaderboard updates
- Synchronize match results with player statistics

---

# 📸 Future Improvements

- Real time match updates using WebSockets
- Push notifications for live matches
- Mobile app version with React Native
- Match commentary system
- Team profile pages and player cards

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---



# 👨‍💻 Author

Built by **Henok Tesfay** to celebrate campus sports culture through technology.