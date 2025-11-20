# FWE SkillSwap

SkillSwap is a small web platform that combines peer-to-peer learning with light gamification.  
Users can offer and book sessions, exchange skills, give feedback, and earn points for helping others.

This project was developed in winter 2024 as part of the **“Frontend-Web Entwicklung”** (**"Frontend Web Development")** course at  
**Hochschule Darmstadt** by a team of [four students](#team).

---

## Project Status

This is an educational university project built for a course.  
It is not actively maintained and is intended primarily as a demonstration of the tech stack and architecture.

---

## Tech Stack

**Frontend**

- React (Vite)
- TypeScript
- React Router
- Axios
- Socket.IO client

**Backend**

- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for auth
- bcrypt for password hashing
- Socket.IO for real-time features

---

## Main Features

- User registration, login, and profile management  
- Create and book skill-sharing sessions
- Basic calendar / session overview
- Gamification (points, simple leaderboard)
- Feedback & ratings for sessions
- Real-time messaging between users
- Basic personalization: light/dark mode and multilingual UI (English & German)

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- A running MongoDB instance
- `.env` files for backend configuration (JWT secrets, Mongo URI, etc.)

### Quick Start

Clone the repository:

```bash
git clone <this-repo-url>
cd skillswap
````

**Backend**

```bash
cd backend
npm install

# create a .env.compose file based on the provided example/template
# then start the dev server:
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server will print the local URL (usually `http://localhost:5173` or similar).

---

## Team

Developed collaboratively by four students at Hochschule Darmstadt:

* Backend development – **[REDACTED]**, **[REDACTED]**
* Frontend development – **[REDACTED]**, **[REDACTED]**

## License

This project is licensed under the **MIT License**.
For details, see the `LICENSE` file.

