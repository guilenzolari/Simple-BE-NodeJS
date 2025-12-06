Aqui está a tradução para o inglês, mantendo o mesmo formato e tom:

---

# Backend Node.js

A modern backend API built with Node.js, Express, and MongoDB for user management.

## 🚀 About the Project

This is a RESTful backend that provides endpoints for user CRUD operations. The project follows best architecture practices, including separation of responsibilities with controllers, services, models, and routes.

## 🛠️ Tech Stack

* **Node.js** – JavaScript runtime
* **Express** – Web framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB ODM
* **ESLint** – Code linter
* **Prettier** – Code formatter
* **Nodemon** – Auto-reload during development

## 📋 Prerequisites

* Node.js v16+
* npm or yarn
* MongoDB (local or cloud, e.g., MongoDB Atlas)

## 🔧 Installation

1. Clone the repository:

```bash
git clone git@github.com:guilenzolari/Simple-BE-NodeJS.git
cd BackendNodeJS
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file at the project root:

```env
MONGO_URI=mongodb+srv://your-user:your-password@your-cluster.mongodb.net/your-database
PORT=3000
```

4. Start the server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
src/
├── config/
│   └── db.js              # MongoDB configuration
├── controllers/
│   └── userController.js  # Endpoint logic
├── models/
│   └── User.js            # User schema
├── routes/
│   └── userRoutes.js      # Route definitions
├── services/
│   └── userService.js     # Business logic
└── server.js              # Main file
```

## 📝 Available Scripts

```bash
# Start server in development mode
npm run dev

# Start server in production
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🔐 Environment Variables

Configure the following variables in the `.env` file:

* `MONGO_URI` – MongoDB connection string
* `PORT` – Server port (default: 3000)

## ⚙️ ESLint Configuration

The project uses ESLint with Prettier to maintain code quality. Rules are configured in `eslint.config.mjs`.

## 🤝 Contributing

1. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC license.

## 👨‍💻 Author

**Guilherme Ferreira Lenzolari**

GitHub: https://github.com/guilenzolari


---

Built by a FE developer to learn about BE 
