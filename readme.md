
# 📰 Social Blog App

A modern full-stack blogging platform that enables users to register, create and manage posts, upload images, comment, and engage with a growing online community.

## 🏗️ Tech Stack

### 🌐 Frontend
- React – Component-based UI
- Vite – Fast dev server and bundler
- Tailwind CSS – Utility-first styling
- Flowbite React – Prebuilt UI components
- Axios – API communication
- React Router – Client-side routing

### 🔧 Backend
- Node.js – Runtime environment
- Express.js – API framework
- MongoDB – NoSQL database
- Mongoose – ODM for MongoDB
- JWT – User authentication
- Multer – File upload middleware
- Docker – Containerization

## 🔐 Features
- 🔑 User registration and login with hashed passwords
- 🛡️ JWT-based protected routes
- ✍️ Create, update, delete, and view blog posts
- 🖼️ Upload and display cover images
- ❤️ Like and unlike posts
- 🧾 Check if a user has liked a post
- 📚 Category-based post filtering (in progress)
- 🧠 Modular, clean codebase with separate controllers, routes, and middleware
- 🐳 Dockerized for easy deployment

## 🚀 Getting Started


## 📦 Project Structure
### BackEnd
```
api/
│
├── middleware/
│    └── verifyToken.js
│
├── models/
│   └── User.js
│   └── Post.js
│   └── Category.js
│
├── routes/
│   └── auth.js
│   └── users.js
│   └── posts.js
│   └── categories.js
│
├── .env
├── index.js
├── package.json
└── README.md
```
### FrontEnd

src/
│
├── components/      # Reusable UI components
├── pages/           # Route-based views (Home, Login, etc.)
├── context/         # Auth context, global state
├── assets/          # Images, icons
├── App.jsx
└── main.jsx
---

## 🛠️ Getting Started

### 1. Clone the Repository
```

``````bash
git clone https://github.com/Boaz-marube/Social_Blogging_App.git
cd api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root and add:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/blogdb
JWT_SECRET=your_jwt_secret_key
```


### 4. Start MongoDB

Ensure MongoDB is running locally:

```bash
mongod
```

You can also use MongoDB Compass if preferred (slower, optional).

### 5. Start the Server

```bash
npm run dev
```

Or in production:

```bash
node index.js
```

---

## 🧪 API Endpoints

| Method | Route                  | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/auth/register`   | Register a new user          |
| POST   | `/api/auth/login`      | Login with username/password |
| GET    | `/api/posts`           | Get all posts                |
| POST   | `/api/posts`           | Create a new post            |
| PUT    | `/api/posts/:id`       | Update a post by ID          |
| DELETE | `/api/posts/:id`       | Delete a post by ID          |
| GET    | `/api/categories`      | Get all categories           |
| POST   | `/api/categories`      | Add new category             |

---


## 👥 Contributors

| Name               | Role                       |
| :----------------- | :------------------------- |
| **Saba Haddis**    | UI/UX Designer             |
| **Boaz Marube**    | Full Stack Developer       |
| **Bereket Eshete** | Full Stack Developer       |
| **Ushindi Sidi**   | AI Integration & QA Tester |

