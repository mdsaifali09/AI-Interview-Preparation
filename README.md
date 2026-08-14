# 🤖 AI Prep Pro

### AI-Powered Interview Preparation Platform

AI Prep Pro is a full-stack interview preparation platform built using the **MERN stack and Generative AI**. It helps users prepare for technical interviews through AI-generated questions, mock interviews, coding practice, resume analysis, analytics, and an interactive AI assistant.

## 🚀 Live Demo

👉 **[AI Prep Pro – Live Demo](https://ai-interview-preparation-8nj8eitl6-mdsaifali09s-projects.vercel.app/)**

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* JWT-based Authentication
* Protected Routes
* User Profile

### 🤖 Generative AI

* AI-powered Interview Question Generator
* AI Chat Assistant
* Talk with AI / Voice Interaction
* Gemini API Integration
* Prompt-based AI responses

### 📄 AI Resume Analyzer

* Upload PDF Resume
* Extract Resume Content
* AI-powered Resume Analysis
* ATS Score
* Job Match Score
* Strength Analysis
* Weakness Analysis
* Missing Skills Detection
* AI Improvement Suggestions
* Resume Analysis History

### 🎤 Mock Interview

* Practice technical interviews
* Interview questions
* Interview history
* Interview performance tracking

### 💻 Coding Interview

* Coding Question Practice
* Code Submission
* Coding History
* Coding Analytics
* Coding Performance Tracking

### 📊 Analytics Dashboard

* Interview Performance
* Coding Performance
* Progress Tracking
* Resume Scores
* Activity Statistics

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* PDF2JSON

### Generative AI

* Google Gemini API
* Prompt Engineering
* LLM API Integration
* AI Chat
* AI Resume Analysis

### Deployment

* Vercel – Frontend
* Render – Backend
* GitHub – Source Code

---

## 🏗️ Project Architecture

```text
AI Prep Pro
│
├── Frontend
│   ├── React
│   ├── Vite
│   ├── Tailwind CSS
│   ├── Pages
│   ├── Components
│   ├── Services
│   └── Context
│
└── Backend
    ├── Node.js
    ├── Express.js
    ├── Controllers
    ├── Routes
    ├── Models
    ├── Middleware
    └── AI Services
```

---

## 🔄 How It Works

```text
User
  ↓
React Frontend
  ↓
REST API
  ↓
Node.js + Express
  ↓
Authentication / Business Logic
  ↓
MongoDB
  ↓
Gemini AI
  ↓
AI Response
  ↓
Frontend
```

---

## 🧠 AI Resume Analysis Flow

```text
Upload Resume PDF
        ↓
Multer File Upload
        ↓
PDF Text Extraction
        ↓
Resume Text
        ↓
Gemini AI
        ↓
ATS & Resume Analysis
        ↓
MongoDB
        ↓
Analysis Report
```

---

## 🔑 Main API Modules

* Authentication API
* AI Generator API
* AI Chat API
* Resume Analysis API
* Interview API
* Interview History API
* Coding API
* Coding Submission API
* Coding Analytics API
* Question Bank API
* Dashboard API
* Analytics API

---

## 📱 Responsive UI

The application is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 🖥️ Laptop
* 📲 Tablet

It includes a responsive navigation sidebar and mobile menu.

---

## 🔒 Security

* JWT Authentication
* Protected API Routes
* Password Hashing
* Environment Variables
* File Type Validation
* Authenticated User-specific Data

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend

Create a `.env` file inside the `fronted` folder:

```env
VITE_API_URL=your_backend_api_url/api
```

> Never commit `.env` files or API keys to GitHub.

---

## ▶️ Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/mdsaifali09/AI-Interview-Preparation.git
```

### 2. Backend

```bash
cd Backend
npm install
npm start
```

### 3. Frontend

Open another terminal:

```bash
cd fronted
npm install
npm run dev
```

---

## 📸 Project Highlights

### Dashboard

AI-powered dashboard with interview progress, analytics and activity tracking.

### Resume Analyzer

Upload your resume and receive AI-powered ATS analysis and improvement suggestions.

### AI Chat

Ask questions and interact with the AI assistant.

### Coding Interview

Practice coding questions and track your coding performance.

---

## 🎯 Future Improvements

* Real-time AI Voice Conversation
* More AI Interview Personalization
* Resume Builder
* Job Recommendation System
* Interview Feedback using AI
* Advanced RAG-based Interview Assistant
* Multi-language Voice Support
* Real-time Coding Evaluation
* Subscription-based Premium Features

---

## 👨‍💻 Developer

**Md Saif Ali**

B.Tech Computer Science Engineering – 2026

### Connect With Me

* GitHub: https://github.com/mdsaifali09
* LinkedIn: https://www.linkedin.com/in/mdsaifali9/

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
