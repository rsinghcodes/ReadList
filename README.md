<h1 align="center">📖 ReadList</h1>

<p align="center">
  <strong>A full-stack blog platform built with React, GraphQL & Node.js</strong><br/>
  Empowering users to publish, discover, and engage with content — seamlessly.
</p>

<p align="center">
  <a href="https://readlistapp.netlify.app/">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="https://github.com/rsinghcodes/readlist-backend">🗄 Backend Repo</a> &nbsp;·&nbsp;
  <a href="#-getting-started">🚀 Getting Started</a>
</p>

<br/>

![ReadList App preview](https://user-images.githubusercontent.com/67682451/149627685-e53e0702-83cf-4433-acb0-98103a622cb1.png)

---

## 📌 About the Project

**ReadList** is a production-grade, full-stack blogging platform where users can write, publish, and share articles with a built-in social layer — likes, comments, and cross-platform sharing.

The project demonstrates end-to-end software engineering skills: from designing a GraphQL API and implementing JWT-based authentication, to building a responsive React UI with code-splitting and containerizing the entire application with Docker.

### The Problem

Most blogging setups are either too opinionated (Medium, Substack) or require significant DevOps overhead (self-hosted WordPress). ReadList fills the gap as a **lightweight, developer-friendly blogging platform** that prioritizes:

- **Zero-friction publishing** — Markdown support with minimal setup.
- **Community engagement** — Built-in likes, comments, and social sharing.
- **Admin governance** — A dedicated admin dashboard for content moderation and user management.
- **Deployment simplicity** — Fully containerized with Docker for one-command setup.

---

## 🏗 Architecture & Tech Stack

ReadList follows a **decoupled client–server architecture** with a GraphQL API layer, enabling flexible and efficient data fetching.

| Layer | Technology | Why This Choice |
|---|---|---|
| **Frontend** | React 17, React Router v6 | Component-driven SPA with declarative routing and code-splitting via `React.lazy` + `Suspense` |
| **UI Library** | Chakra UI + Framer Motion | Accessible, themeable component library with built-in animation support |
| **API Layer** | GraphQL + Apollo Client | Single endpoint, type-safe queries/mutations, client-side caching with `InMemoryCache` |
| **State Management** | React Context API + `useReducer` | Lightweight auth state management without external dependencies |
| **Form Handling** | Formik + Yup | Declarative form management with schema-based validation |
| **Authentication** | JWT (JSON Web Tokens) | Stateless auth — token stored client-side, attached to every GraphQL request via Apollo Link |
| **Backend** | Node.js + Express.js + Apollo Server | [Separate repo →](https://github.com/rsinghcodes/readlist-backend) |
| **Database** | MongoDB + Mongoose (Atlas) | Document-oriented storage ideal for flexible blog post schemas |
| **DevOps** | Docker (multi-stage build) + Nginx | Production image uses Nginx to serve the optimized React build |
| **Bundler** | Webpack (via Create React App) | Zero-config setup with tree-shaking, code-splitting, and hot reload |
| **Deployment** | Render (API) + Netlify (UI) | Serverless-friendly hosting with CI/CD from GitHub |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (React SPA)                 │
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Chakra UI│  │ React Router │  │  Apollo Client    │  │
│  │  + Framer│  │    v6        │  │  (InMemoryCache)  │  │
│  └──────────┘  └──────────────┘  └────────┬──────────┘  │
│                                           │              │
└───────────────────────────────────────────┼──────────────┘
                                            │ GraphQL (HTTPS)
                                            │ + JWT Bearer Token
┌───────────────────────────────────────────┼──────────────┐
│                      SERVER (Node.js)     │              │
│                                           ▼              │
│  ┌────────────────────────────────────────────────────┐  │
│  │           Apollo Server + Express.js               │  │
│  │         (GraphQL Resolvers & Middleware)            │  │
│  └─────────────────────┬──────────────────────────────┘  │
│                        │                                 │
│                        ▼                                 │
│              ┌──────────────────┐                        │
│              │  MongoDB Atlas   │                        │
│              │   (Mongoose ODM) │                        │
│              └──────────────────┘                        │
└──────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 👤 User Features
- **Authentication** — Register/Login with JWT-based session management
- **Create & Edit Posts** — Full CRUD with Markdown support
- **Social Engagement** — Like and comment on published posts
- **Search** — Find posts across the platform
- **Profile Management** — Update name, password, or delete account
- **Social Sharing** — Copy-to-clipboard share links for any post
- **Reading Time** — Auto-calculated estimated reading time per post

### 🛡 Admin Dashboard
- **User Management** — View, revoke, or delete user accounts
- **Content Moderation** — Delete posts and comments platform-wide
- **Admin Management** — Create or remove admin accounts
- **Role-Based Access** — Separate auth routes for admin vs. user roles

![Admin Dashboard](https://user-images.githubusercontent.com/67682451/149628367-61b650aa-0289-42a0-a027-e374bd14bc8a.png)

---

## 🔐 Authentication Flow

```
1. User submits credentials → GraphQL Mutation (login/register)
2. Server validates & returns signed JWT
3. Client stores JWT in localStorage
4. Apollo Link middleware attaches "Authorization: Bearer <token>" to every request
5. Server middleware verifies token on protected resolvers
6. On token expiry → client-side auto-logout via jwt-decode check
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm or yarn
- Docker (optional, for containerized setup)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/rsinghcodes/ReadList.git
cd ReadList

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Open **[http://localhost:3000](http://localhost:3000)** to view it in the browser.

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up --build
```

The app will be served via Nginx at **[http://localhost:3000](http://localhost:3000)**.

---

## 📁 Project Structure

```
ReadList/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components (Header, PostCard, LikeButton, etc.)
│   ├── context/             # React Context for auth state management
│   ├── pages/               # Route-level page components
│   │   └── Admin/           # Admin-only pages (Login, Dashboard)
│   ├── theme/               # Chakra UI custom theme configuration
│   ├── utils/               # Route guards, GraphQL queries & mutations
│   ├── App.js               # Root component with route definitions
│   └── ApolloProvider.js    # Apollo Client setup with auth link middleware
├── Dockerfile               # Multi-stage build (Node → Nginx)
├── docker-compose.yml       # One-command container orchestration
├── nginx.conf               # Nginx configuration for SPA routing
└── package.json
```

---

## 🔮 Future Enhancements — AI & Beyond

### 🤖 AI-Powered Features
| Feature | Description | Potential Tech |
|---|---|---|
| **AI Content Suggestions** | Auto-generate post titles, summaries, and tags using LLMs | OpenAI API / Google Gemini API |
| **Smart Search** | Semantic search across posts using vector embeddings instead of keyword matching | Pinecone / Weaviate + Sentence Transformers |
| **AI Writing Assistant** | Inline writing suggestions, grammar fixes, and tone adjustments while composing posts | LangChain + Streaming GPT |
| **Auto-Moderation** | Flag or auto-remove toxic/spam comments using NLP classification | Hugging Face Transformers (toxicity model) |
| **Personalized Feed** | Recommend posts based on user reading history and engagement patterns | Collaborative filtering / TF-IDF + cosine similarity |
| **Auto-Tagging & Categorization** | Automatically classify posts into topics/categories using NLP | Zero-shot classification (BART-MNLI) |
| **Reading Analytics** | AI-generated insights on reading patterns, popular topics, and engagement trends | Python data pipeline + Chart.js |
| **TL;DR Summaries** | One-click AI-generated summary for long-form posts | Abstractive summarization (PEGASUS / GPT) |

### 🛠 Platform Improvements
- **OTP-Based Authentication** — Email/SMS OTP verification for enhanced security
- **Real-Time Notifications** — WebSocket-powered alerts for likes, comments, and new followers
- **Rich Text Editor** — WYSIWYG editor with autocomplete, slash commands, and media embeds
- **Advanced Filtering** — Filter posts by tags, categories, date range, and popularity
- **PWA Support** — Offline reading and push notifications
- **CI/CD Pipeline** — Automated testing and deployment with GitHub Actions

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/rsinghcodes/ReadList/issues).

## 📄 License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.

## ⭐ Show Your Support

If you found this project useful, please consider giving it a **star** ⭐ — it helps others discover it!

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/rsinghcodes">Raghvendra Singh</a>
</p>
