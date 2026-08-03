# 🚀 CodeLens

> CodeLens is a full-stack web application that analyzes public GitHub repositories and generates AI-powered summaries, issues, suggestions, and file-wise code reviews using Google Gemini.

## 🌐 Live Demo

🔗 https://code-lens-opal.vercel.app/

---

## ✨ Features

- User Authentication (Register & Login)
- Analyze any public GitHub repository
- Repository summary generated using AI
- File-wise code review
- Detect possible issues and code improvements
- Search reviews by filename
- Clean and responsive UI
- Fast repository analysis

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI
- Google Gemini API

### Other
- GitHub API
- JWT Authentication

---

## 📷 Screenshots

(Add screenshots here)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/ghuleomkar/CodeLens.git
cd CodeLens
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
GITHUB_TOKEN=your_github_token
CLIENT_URL=http://localhost:5173
```

---

## 📁 Project Structure

```text
CodeLens
│
├── Client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   │   ├── ai
│   │   │   ├── github
│   │   │   └── parser
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Future Improvements

- Chat with repository
- Repository history
- Pull Request review
- Team collaboration
- AI generated documentation

---

## 👨‍💻 Author

**Omkar Ghule**

GitHub:
https://github.com/ghuleomkar

LinkedIn:
https://www.linkedin.com/in/omkar-ghule-993512345/
