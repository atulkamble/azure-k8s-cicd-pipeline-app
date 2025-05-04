working full-stack app setup with **ReactJS frontend**, **Node.js + Express backend**, and **PostgreSQL database** — ready to be Dockerized and deployed via Azure DevOps to AKS.

---

## 📦 Project Structure

```
azure-aks-terraform-devops-app/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── App.js
│       └── index.js
```

---

## 🔙 Backend Code (Node.js + Express + PostgreSQL)

📁 `backend/package.json`

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.10.0",
    "cors": "^2.8.5"
  }
}
```

📁 `backend/index.js`

```js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'mydb',
  password: 'postgres',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log('🚀 Backend listening on port 5000');
});
```

📝 PostgreSQL will need a table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);
```

📁 `backend/Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "index.js"]
```

---

## 🌐 Frontend Code (ReactJS)

📁 `frontend/package.json`

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

📁 `frontend/src/App.js`

```js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>👨‍💻 Users List</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
```

📁 `frontend/src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

📁 `frontend/public/index.html` (minimal)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Frontend App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

📁 `frontend/Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🐘 PostgreSQL Docker Setup (if testing locally)

📁 `docker-compose.yml` (optional)

```yaml
version: '3'
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
```

---
